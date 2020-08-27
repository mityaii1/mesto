export default class Card {
    constructor(data, cardSelector, handleCardClick, handleCardRemove, userInfoId, handleAddLike, handleRemoveLike) {

        this._data = data;
        this._title = data.name;
        this._image = data.link;
        this._cardId = data._id;
        this._userId = data.owner._id;
        this._likes = data.likes
        this._likeCounter = data.likes.length;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._myCard = userInfoId === this._userId;
        this.myLike = this._likes.some((like) => like._id === userInfoId)
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
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
        this._cardButtonLike = this._elementCard.querySelector('.element__button-like');
        this._cardNumberLikes = this._elementCard.querySelector('.element__number-likes');
        this._cardNumberLikes.textContent = this._likeCounter
        this._cardButtonReemove = this._elementCard.querySelector('.element__button-remove');
        if (!this._myCard) {
            this._cardButtonReemove.remove();
        };
        if (this.myLike) {
            this._cardButtonLike.classList.add('element__button-like_active')
        };
        this._cardId;
        return this._elementCard;
    }
    _setEventListeners() {
        this._cardBtnLike = this._elementCard.querySelector('.element__button-like');
        this._cardBtnLike.addEventListener('click', (evt) => {
            this._likeCard(evt);
            this.like()
        });
        this._elementCard.querySelector('.element__button-remove').addEventListener('click', () => {
            this._handleCardRemove(this._elementCard);
        });
        this._elementCard.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._cardImage);
        });
    }
    like() {
        if (this._cardBtnLike.classList.contains('element__button-like_active')) {
            this._handleAddLike(this._cardId, this._cardNumberLikes)
        }
        else {
            this._handleRemoveLike(this._cardId, this._cardNumberLikes)
        }
    }
    _likeCard(evt) {
        evt.target.classList.toggle('element__button-like_active');
    }
    removeCard() {
        this._elementCard.remove();
        this._elementCard = '';
    }
}
