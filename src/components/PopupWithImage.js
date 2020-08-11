import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._imagePreview = this._popupSelector.querySelector('.popup__preview');
        this._TitleImage = this._popupSelector.querySelector('.popup__title-image');
    }
    open(data) {
        super.open();
        this._imagePreview.src = data.link;
        this._imagePreview.alt = data.name;
        this._TitleImage.textContent = data.name;
    }
}
