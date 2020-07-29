export const popupImage = document.querySelector('.popup_images');
export const popupAddCard = document.forms.popup_card;


const popup = document.querySelectorAll('.popup');
const popupCloseImage = popupImage.querySelector('.popup__close-image');

// Открыть или закрыть popup
export function openClosePopup(elem) {
    elem.classList.toggle('popup_opened');
    if (elem.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupEsc);
    }
    else {
        document.removeEventListener('keydown', closePopupEsc);
    }
};

// Закрыть popup кнопкой Escape 
export function closePopupEsc(evt) {
    const popupOpened = document.querySelector('.popup_opened')
    if (evt.key === "Escape") {
        popupAddCard.reset();
        openClosePopup(popupOpened)
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

popupCloseImage.addEventListener('click', () => { openClosePopup(popupImage) });