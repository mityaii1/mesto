import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._formSelector = this._popupSelector.querySelector('.popup__form')
    }
    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__input')
        this._formValues = {}
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value
        })
        return this._formValues
    }
    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmitHandler(this._getInputValues());
        })
    }
    close() {
        super.close();
        this._formSelector.reset();
    }
}