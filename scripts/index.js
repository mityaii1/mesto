const popup = document.querySelectorAll('.popup');
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

// Пременные template
const elementTemplate = document.querySelector('#element-template');

// Переменные popup card
const popupCard = document.querySelector('.popup_card');
const popupCloseCard = popupCard.querySelector('.popup__close-card');

// Переменные elements
const elements = document.querySelector('.elements');

// Переменные popup image
const popupImage = document.querySelector('.popup_images');
const popupCloseImage = popupImage.querySelector('.popup__close-image');
const popupPreview = popupImage.querySelector('.popup__preview');
const popupTitleImage = popupImage.querySelector('.popup__title-image');

// Получить форму card и ее элементы
const popupAddCard = document.forms.popup_card;
const nameCard = popupAddCard.elements.name_card;
const linkCard = popupAddCard.elements.link_to_image;

// Создать карточку
function createCard(name, link) {
    const elementCard = elementTemplate.content.cloneNode(true);
    const imageCard = elementCard.querySelector('.element__image');
    const elementTitle = elementCard.querySelector('.element__title');
    const elementButtonLike = elementCard.querySelector('.element__button-like');
    const elementButtonRemove = elementCard.querySelector('.element__button-remove');

    elementTitle.textContent = name;
    imageCard.src = link;
    imageCard.alt = name;
    elementButtonLike.addEventListener('click', cardLike);
    imageCard.addEventListener('click', previewImage);
    elementButtonRemove.addEventListener('click', removeCard);

    return elementCard;
};

// Добавить карточки из начального массива
initialCards.forEach(function (elem) {
    elements.append(createCard(elem.name, elem.link));
});

// Открыть или закрыть popup
function openClosePopup(elem) {
    elem.classList.toggle('popup_opened');
    if (elem.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupEsc);
    }
    else {
        document.removeEventListener('keydown', closePopupEsc);
    }
};

// Закрыть popup кликом на оверлей
popup.forEach(function (elem) {
    elem.addEventListener('mousedown', function (evt) {
        if (evt.target !== evt.currentTarget) {
            return
        }
        openClosePopup(evt.target.closest('.popup'));
        popupAddCard.reset();
    })
});

// Закрыть popup кнопкой Escape 
function closePopupEsc(evt) {
    const popupOpened = document.querySelector('.popup_opened')
    if (evt.key === "Escape") {
        popupAddCard.reset();
        openClosePopup(popupOpened)
    }
};

// Заполнить форму edit profile значениями со страницы
function popupOpenProfile() {
    newName.value = profileTitle.textContent;
    newAboutMe.value = profileSubtitle.textContent;
    openClosePopup(popupProfile);
    resetInputError(popupProfile);
    activityStatusButton(popupProfile);
};

// Изменить значения profile из формы popup
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = newName.value;
    profileSubtitle.textContent = newAboutMe.value;
    openClosePopup(popupProfile);
};

// Добавить новую карточку из формы
popupAddCard.addEventListener('submit', function (evt) {
    evt.preventDefault();
    elements.prepend(createCard(nameCard.value, linkCard.value));
    popupAddCard.reset();
    openClosePopup(popupCard);
    activityStatusButton(popupCard);
})

// Сбросить ошибки форм
function resetInputError(formSelector) {
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'))
    inputList.forEach((inputSelector) => {
        hideInputError(formSelector, inputSelector)
    })
};

// Проверить статус активности кнопки submit
function activityStatusButton(formSelector) {
    const inputList = Array.from(formSelector.querySelectorAll('.popup__input'));
    const buttonElement = formSelector.querySelector('.popup__button-save')
    toggleButtonState(inputList, buttonElement)
};

//  Увеличить картинку
function previewImage(evt) {
    const item = evt.target;
    const itemText = evt.target.closest('.element');
    popupPreview.src = item.src;
    popupPreview.alt = item.alt;
    popupTitleImage.textContent = itemText.textContent;
    openClosePopup(popupImage);
};

// Поставить лайк
function cardLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
};

// Удалить карточку
function removeCard(evt) {
    const elementCard = evt.target.closest('.element');
    elementCard.remove();
};

profileEditButton.addEventListener('click', popupOpenProfile);
popupCloseEdit.addEventListener('click', () => { openClosePopup(popupProfile) });
popupContainerProfile.addEventListener('submit', formSubmitHandler);
profileAddButton.addEventListener('click', () => { openClosePopup(popupCard), resetInputError(popupCard) });
popupCloseCard.addEventListener('click', () => { openClosePopup(popupCard); popupAddCard.reset() });
popupCloseImage.addEventListener('click', () => { openClosePopup(popupImage) });

