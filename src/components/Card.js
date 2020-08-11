export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._data = data;
        this._title = data.name;
        this._image = data.link;
        this._like = false;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector('#element-template')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }
    generateCard() {
        this._elementCard = this._getTemplate();
        this._setEventListeners();

        this._cardImage = this._elementCard.querySelector('.element__image');
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._elementCard.querySelector('.element__title').textContent = this._title;

        return this._elementCard;
    }
    _setEventListeners() {
        this._elementCard.querySelector('.element__button-like').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });
        this._elementCard.querySelector('.element__button-remove').addEventListener('click', () => {
            this._removeCard();
        });
        this._elementCard.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._data);
        });
    }
    _likeCard(evt) {
        evt.target.classList.toggle('element__button-like_active');
    }
    _removeCard() {
        this._elementCard.remove();
        this._elementCard = null;
    }
};
