const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`)
  inputSelector.classList.add(formObject.inputErrorClass);
  errorElement.classList.add(formObject.errorClass);
  errorElement.textContent = errorMessage;

};

const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`)
  inputSelector.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.removeAttribute('disabled')
  }
};

const setEventListeners = (formSelector, ) => {
  const inputList = Array.from(formSelector.querySelectorAll(formObject.inputSelector));
  const buttonElement = formSelector.querySelector(formObject.submitButtonSelector)
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputSelector) => {

    inputSelector.addEventListener('input', () => {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formObject.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation(formObject);
