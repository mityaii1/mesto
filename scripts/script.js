// Переменные profile
let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

// Переменные popup
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupCloseIcon = popup.querySelector('.popup__close-icon');
let newName = popup.querySelector('.popup__input_name');
let newAboutMe = popup.querySelector('.popup__input_about-me');

// Открыть и закрыть popup, Заполнить значения из profile
let popupToggle = function togglePopup() {
    newName.value = profileTitle.textContent;
    newAboutMe.value = profileSubtitle.textContent;
    popup.classList.toggle('popup_opened');
};

// Изменить значения profile из формы popup
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = newName.value;
    profileSubtitle.textContent = newAboutMe.value;
    popupToggle();
};

profileEditButton.addEventListener('click', popupToggle);
popupCloseIcon.addEventListener('click', popupToggle);
popupContainer.addEventListener('submit', formSubmitHandler);
