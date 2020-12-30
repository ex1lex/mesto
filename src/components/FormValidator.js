export class FormValidator {
  constructor(options) {
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._btn = this._formSelector.querySelector(this._submitButtonSelector);
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._btn.classList.add(this._inactiveButtonClass);
      this._btn.disabled = true;
    } else {
      this._btn.classList.remove(this._inactiveButtonClass);
      this._btn.disabled = false;
    }
  }

  _showError(inputElement) {
    const errorElement = this._formSelector.querySelector(
      `#${inputElement.name}Error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._formSelector.querySelector(
      `#${inputElement.name}Error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }

  _setEventListeners() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState(this._inputList);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  resetForm(formCheck) {
    this._toggleButtonState(this._inputList);
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
      inputElement.value = "";
    });
    if (formCheck) {
      this._btn.classList.remove(this._inactiveButtonClass);
      this._btn.disabled = false;
    }
  }

  enableValidation() {
    this._inputList = Array.from(
      this._formSelector.querySelectorAll(this._inputSelector)
    );
    this._setEventListeners();
  }
}
