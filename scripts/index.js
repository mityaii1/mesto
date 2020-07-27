import { openClosePopup, popupAddCard } from './popup.js'
import { Card } from './Card.js'
import { initialCards } from './initial-cards.js'
import { FormValidator } from './FormValidator.js';


// Переменные profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

// Переменные popup profile
const popupProfile = document.querySelector('.popup_profile');
const popupContainerProfile = popupProfile.querySelector('.popup__container-profile');
const popupCloseEdit = popupProfile.querySelector('.popup__close-edit');
const newName = popupProfile.querySelector('.popup__input_name');
const newAboutMe = popupProfile.querySelector('.popup__input_about-me');

// Переменные popup card
const popupCard = document.querySelector('.popup_card');
const popupCloseCard = popupCard.querySelector('.popup__close-card');

// Переменные elements
const elements = document.querySelector('.elements');

// Получить элементы формы card
const nameCard = popupAddCard.elements.name_card;
const linkCard = popupAddCard.elements.link_to_image;

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
function addCard (item) {
      const card = new Card(item, '#element-template');
      elements.prepend(card.generateCard());
  };
  initialCards.forEach(item => addCard(item));

// Добавить новую карточку из формы
popupAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addCard({
        name: nameCard.value,
        link: linkCard.value
      });
    openClosePopup(popupCard);
    cardFormValidator.resetInputError();
    cardFormValidator.activityStatusButton();
})

// Заполнить форму edit profile значениями со страницы
function popupOpenProfile() {
    newName.value = profileTitle.textContent;
    newAboutMe.value = profileSubtitle.textContent;
    openClosePopup(popupProfile);
};

// Изменить значения profile из формы popup
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = newName.value;
    profileSubtitle.textContent = newAboutMe.value;
    openClosePopup(popupProfile);
};

profileEditButton.addEventListener('click', popupOpenProfile);
popupContainerProfile.addEventListener('submit', formSubmitHandler);

popupCloseEdit.addEventListener('click', () => { 
    openClosePopup(popupProfile) 
});
profileAddButton.addEventListener('click', () => { 
    openClosePopup(popupCard), 
    cardFormValidator.resetInputError();
});
popupCloseCard.addEventListener('click', () => { 
    openClosePopup(popupCard); popupAddCard.reset() 
});

// Вызвать валидацию форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();


