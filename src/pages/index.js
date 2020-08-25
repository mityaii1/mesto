import Section from '../components/Section.js'
import  Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import '../pages/index.css';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: 'b1f35061-c301-414a-92c3-da1eeb67e987',
        'Content-Type': 'application/json'
    }
});

// Переменные profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const profileAvatarImage = profile.querySelector('.profile__avatar');
const profileAvatarEdit = profile.querySelector('.profile__avatar-edit');

const popupAvatar = document.querySelector('.popup_update-avatar');

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
const avatarFormValidator = new FormValidator(validationSettings, popupAvatar);

// Добавить карточки на страницу
let addCard;
api.getInitialCards()
    .then((res) => {
        addCard = new Section({
            items: res.reverse(),
            renderer: (item) => {
                const card = new Card(
                    item,
                    '#element-template',
                    handleCardClick,
                    handleCardRemove,
                    userInfo.id,
                    handleAddLike,
                    handleRemoveLike)
                const cardElement = card.generateCard();
                addCard.addItem(cardElement)
            }
        },
            elements
        )
        addCard.renderer();
    })
    .catch(() => {
        console.log('Хорошая попытка, но нет, карточки не загрузились!');
    });

// Получить информацию о пользователе
const userInfo = new UserInfo({
    userNameSelector: profileTitle,
    userAboutMeSelector: profileSubtitle,
    userAvatarSelector: profileAvatarImage
});
api.getUserInfo()
    .then((res) => {
        userInfo.setUserInfo(res.name, res.about),
            userInfo.setUserAvatar(res.avatar);
        userInfo.setUserId(res._id)
    })
    .catch(() => {
        console.log('Хорошая попытка, но нет, пользователь не загрузился!');
    });

// Изменить значения profile из формы popup
const profileEditPopup = new PopupWithForm('.popup_profile', (item) => {
    userInfo.setUserInfo(item.full_name, item.about_me, item.id),
    renderLoading(profileEditPopup._popupButtonSave, true); 
        api.setUserInfo(item.full_name, item.about_me, item.id)
            .catch(() => {
                console.log('Хорошая попытка, но нет, пользователь не изменился!');
            }) 
            .finally(() => {
                renderLoading(profileEditPopup._popupButtonSave, false);
              }) 
    profileEditPopup.close()
})

// Добавить новую карточку из формы
const addCardsPopup = new PopupWithForm('.popup_card', (item) => {
    renderLoading(addCardsPopup._popupButtonSave, true); 
    const newCard = new Card(
        { name: item.name_card, link: item.link_to_image, likes: [], owner: { _id: userInfo.id } },
        '#element-template',
        handleCardClick,
        handleCardRemove,
        userInfo.id,
        handleAddLike,
        handleRemoveLike);
    const cardElement = newCard.generateCard();
    addCard.addItem(cardElement);
    api.addNewCard(item.name_card, item.link_to_image)
    .finally(() =>{
        renderLoading(addCardsPopup._popupButtonSave, false);
    })
    addCardsPopup.close()
})
// Удалить карточку
let myCards;
const removeCardPopup = new PopupWithForm('.popup_remove-card', () => {
    myCards.removeCard();
    api.deleteCard(myCards._cardId)
    .catch(() => {
        console.log('Хорошая попытка, но нет, карточка не удалилась!'); 
      });
    removeCardPopup.close()
})
function handleCardRemove() {
    myCards = this;
    removeCardPopup.open();
}
// Изменить Аватар
const updateAvatarPopup = new PopupWithForm('.popup_update-avatar', (item) => {
    userInfo.setUserAvatar(item.link_to_avatar)
    renderLoading(updateAvatarPopup._popupButtonSave, true);
    api.updateAvatar(item.link_to_avatar)
        .catch(() => {
            console.log('Хорошая попытка, но нет, аватар не загрузился!');
        })
        .finally(() => {
            renderLoading(updateAvatarPopup._popupButtonSave, false);
          }) 
    updateAvatarPopup.close()
})
//Функция: открыть попап с картинкой при клике на карточку
const popupPreview = new PopupWithImage('.popup_images');
function handleCardClick(data) {
    popupPreview.open(data);
}
// Функция: поставть лайк
function handleAddLike (cardId, cardNumberLikes){
    api.addLike(cardId)
    .then((res) => {
        cardNumberLikes.textContent = res.likes.length;
        //console.log(res)
    })
    .catch(() => {
        console.log('Хорошая попытка, но нет, лайк не поставился!');
      });
}
// Функция: удалить лайк
function handleRemoveLike (cardId, cardNumberLikes){
    api.deleteLike(cardId)
    .then((res) => {
        cardNumberLikes.textContent = res.likes.length;
    })
}
// Функция: включить лоадер
function renderLoading(buttonSave, isLoading) {
    if (isLoading) {
        buttonSave.textContent = 'Сохранение...'
    } 
    else{
        buttonSave.textContent = 'Сохранить'
    }
  }

addCardsPopup.setEventListeners();
profileEditPopup.setEventListeners();
popupPreview.setEventListeners();
updateAvatarPopup.setEventListeners();
removeCardPopup.setEventListeners();

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

profileAvatarEdit.addEventListener('click', () => {
    updateAvatarPopup.open();
});


// Вызвать валидацию форм
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
