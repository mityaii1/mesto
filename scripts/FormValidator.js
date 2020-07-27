export class FormValidator{
  constructor (obj, formElement){
    this._formElement = formElement;
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
  }
  _showInputError(inputSelector, errorMessage){
    const errorElement = this._formElement.querySelector(`#${inputSelector.id}-error`)
    inputSelector.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };
  _hideInputError = (inputSelector) => {
    const errorElement = this._formElement.querySelector(`#${inputSelector.id}-error`)
    inputSelector.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };
  _checkInputValidity = (inputSelector) => {
    if (!inputSelector.validity.valid) {
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      this._hideInputError(inputSelector);
    }
  };
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    });
  }
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.removeAttribute('disabled')
    }
  };
  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        this._checkInputValidity(inputSelector);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  // Сбросить ошибки форм
resetInputError() {
  const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
  inputList.forEach((inputSelector) => {
      this._hideInputError(inputSelector)
  })
};
// Проверить статус активности кнопки submit
activityStatusButton() {
  const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
  this._toggleButtonState(inputList, buttonElement)
};

enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
};
}


