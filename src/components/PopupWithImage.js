import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._imagePreview = this._popupSelector.querySelector('.popup__preview');
        this._titleImage = this._popupSelector.querySelector('.popup__title-image');
    }
    open(data) {
        super.open();
        this._imagePreview.src = data.src;
        this._imagePreview.alt = data.alt;
        this._titleImage.textContent = data.alt;
    }
}
