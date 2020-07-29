import { openClosePopup, popupImage } from './popup.js'

export class Card {
    constructor(data, cardSelector) {
        this._title = data.name;
        this._image = data.link;
        this._like = false;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector('#element-template')
            .content
            .cloneNode(true);

        return cardElement;
    }
    generateCard() {
        this._elementCard = this._getTemplate();
        this._setEventListeners();

        this._elementCard.image = this._elementCard.querySelector('.element__image');
        this._elementCard.title = this._elementCard.querySelector('.element__title');

        this._elementCard.image.src = this._image;
        this._elementCard.image.alt = this._title;
        this._elementCard.title.textContent = this._title;

        return this._elementCard;
    }
    _setEventListeners() {
        this._elementCard.like = this._elementCard.querySelector('.element__button-like');
        this._elementCard.remove = this._elementCard.querySelector('.element__button-remove');
        this._elementCard.image = this._elementCard.querySelector('.element__image');

        this._elementCard.like.addEventListener('click', (evt) => {
            this._likeCard(evt);
        });
        this._elementCard.remove.addEventListener('click', () => {
            this._removeCard();
        });
        this._elementCard.image.addEventListener('click', () => {
            this._previewImage();
        });
    }
    _likeCard(evt) {
        evt.target.classList.toggle('element__button-like_active');
    }
    _removeCard() {
        this._element = document.querySelector('.element');
        this._element.remove()
    }
    _previewImage() {
        const _popupPreview = document.querySelector('.popup__preview');
        _popupPreview.src = this._image;
        _popupPreview.alt = this._title;
        document.querySelector('.popup__title-image').textContent = this._title;
        openClosePopup(popupImage);
    };

};
