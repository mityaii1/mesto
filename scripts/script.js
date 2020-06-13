let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubtitle = profile.querySelector('.profile__subtitle');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupCloseIcon = popup.querySelector('.popup__close-icon');
let popupButtonSave = popup.querySelector('.popup__button-save');
let newName = popup.querySelector('.popup__input_name');
let newAboutMe = popup.querySelector('.popup__input_about-me');

function openPopup() {
    popup.classList.add('popup_opened');
};
function closePopup() {
    popup.classList.remove('popup_opened');
};
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = newName.value;
    profileSubtitle.textContent = newAboutMe.value;
    return false;
}; 

profileEditButton.addEventListener('click', openPopup);
popupCloseIcon.addEventListener('click', closePopup);
popupButtonSave.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler);
