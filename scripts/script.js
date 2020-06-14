// Переменные profile
let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');

// Переменные popup
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupCloseIcon = popup.querySelector('.popup__close-icon');
let popupButtonSave = popup.querySelector('.popup__button-save');
let newName = popup.querySelector('.popup__input_name');
let newAboutMe = popup.querySelector('.popup__input_about-me');

// Открыть popup и заполнить значения из profile
function openPopup() {
    newName.value = profileTitle.textContent;
    newAboutMe.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
    
};

// Закрыть popup
function closePopup() {
    popup.classList.remove('popup_opened');
};

// Изменить значения profile из формы popup
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = newName.value;
    profileSubtitle.textContent = newAboutMe.value;
    closePopup();
}; 

profileEditButton.addEventListener('click', openPopup);
popupCloseIcon.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);
