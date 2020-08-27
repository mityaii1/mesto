import Section from '../components/Section.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { renderLoading } from '../../src/utils/utils.js';
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
function createCard(item) {
    const card = new Card(
        item,
        '#element-template',
        handleCardClick,
        handleCardRemove,
        userInfo.id,
        handleAddLike,
        handleRemoveLike);
    const cardElement = card.generateCard();
    addCard.addItem(cardElement);
}
const addCard = new Section({
    renderer: ((item) => {
        createCard(item)
    })
},
    elements)

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, res]) => {
        userInfo.setUserInfo(user.name, user.about),
        userInfo.setUserAvatar(user.avatar),
        userInfo.setUserId(user._id)
        addCard.renderer(res.reverse());
    })
    .catch((err) => {
        console.log(err);
    })

// Получить информацию о пользователе
const userInfo = new UserInfo({
    userNameSelector: profileTitle,
    userAboutMeSelector: profileSubtitle,
    userAvatarSelector: profileAvatarImage
});

// Изменить значения profile из формы popup
const profileEditPopup = new PopupWithForm('.popup_profile', (item) => {
    renderLoading(profileEditPopup._popupButtonSave, true);
    api.setUserInfo(item.full_name, item.about_me, item.id)
        .then(() => {
            userInfo.setUserInfo(item.full_name, item.about_me, item.id),
                profileEditPopup.close()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(profileEditPopup._popupButtonSave, false);
        })
})

// Добавить новую карточку из формы
const addCardsPopup = new PopupWithForm('.popup_card', (item) => {
    renderLoading(addCardsPopup._popupButtonSave, true);
    api.addNewCard(item.name_card, item.link_to_image)
        .then((res) => {
            console.log(res)
            createCard({
                name: item.name_card,
                link: item.link_to_image,
                likes: [],
                owner: { _id: userInfo.id }
            });
            addCardsPopup.close()
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(addCardsPopup._popupButtonSave, false);
        })
})

// Удалить карточку
let myCards;
const removeCardPopup = new PopupWithForm('.popup_remove-card', () => {
    api.deleteCard(myCards._cardId)
        .then(() => {
            myCards.removeCard();
            removeCardPopup.close() 
        })
        .catch((err) => { console.log(err); });
})
function handleCardRemove() {
    myCards = this;
    removeCardPopup.open();
}
// Изменить Аватар
const updateAvatarPopup = new PopupWithForm('.popup_update-avatar', (newAvatar) => {
    renderLoading(updateAvatarPopup._popupButtonSave, true);
    api.updateAvatar(
        newAvatar.link_to_avatar
    )
        .then((info) => {
            userInfo.setUserAvatar(info.avatar)
            updateAvatarPopup.close()
        })
        .catch(() => {
            console.log('Хорошая попытка, но нет, аватар не загрузился!');
        })
        .finally(() => {
            renderLoading(updateAvatarPopup._popupButtonSave, false);
        })

})
//Функция: открыть попап с картинкой при клике на карточку
const popupPreview = new PopupWithImage('.popup_images');
function handleCardClick(data) {
    popupPreview.open(data);
}
// Функция: поставть лайк
function handleAddLike(cardId, cardNumberLikes) {
    api.addLike(cardId)
        .then((res) => {
            cardNumberLikes.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}
// Функция: удалить лайк
function handleRemoveLike(cardId, cardNumberLikes) {
    api.deleteLike(cardId)
        .then((res) => {
            cardNumberLikes.textContent = res.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
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
