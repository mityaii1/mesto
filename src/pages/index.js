import Section from '../components/Section.js'
import { Card } from '../components/Card.js'
import { initialCards } from '../components/initial-cards.js'
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

// Переменные profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

// Переменные popup profile
const popupProfile = document.querySelector('.popup_profile');
const newName = popupProfile.querySelector('.popup__input_name');
const newAboutMe = popupProfile.querySelector('.popup__input_about-me');

// Переменные popup card
const popupCard = document.querySelector('.popup_card');

// Переменные elements
const elements = '.elements';

// Настройки валидации
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};
const profileFormValidator = new FormValidator(validationSettings, popupProfile);
const cardFormValidator = new FormValidator(validationSettings, popupCard);

// Добавить карточки из начального массива
const addCard = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(
            item, 
            '#element-template', 
            handleCardClick);
        const cardElement = card.generateCard();
        addCard.addItem(cardElement)
    }
},
    elements
)
addCard.renderer();

// Получить информацию о пользователе
const userInfo = new UserInfo({ 
    userNameSelector: profileTitle, 
    userAboutMeSelector: profileSubtitle 
});

// Изменить значения profile из формы popup
const profileEditPopup = new PopupWithForm('.popup_profile', () =>{
    userInfo.setUserInfo(newName, newAboutMe)
    profileEditPopup.close()
})

// Добавить новую карточку из формы
const addCardsPopup = new PopupWithForm('.popup_card', (item) => {
    const newCard = new Card(
        { name: item.name_card, link: item.link_to_image },
        '#element-template',
        handleCardClick);
    const cardElement = newCard.generateCard();
    addCard.addItem(cardElement)
    addCardsPopup.close()
})

//Функция: открыть попап с картинкой при клике на карточку
const popupPreview = new PopupWithImage('.popup_images');
function handleCardClick(data) {
    popupPreview.open(data);
}

addCardsPopup.setEventListeners();
profileEditPopup.setEventListeners();
popupPreview.setEventListeners();

profileEditButton.addEventListener('click', () => {
    profileEditPopup.open();
    const infoAboutUser = userInfo.getUserInfo();
    newName.value = infoAboutUser.full_name;
    newAboutMe.value = infoAboutUser.about_me;
    
    profileFormValidator.resetInputError();
    profileFormValidator.activityStatusButton();
});

profileAddButton.addEventListener('click', () => {
    addCardsPopup.open();
    cardFormValidator.resetInputError();
    cardFormValidator.activityStatusButton();
});

// Вызвать валидацию форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
