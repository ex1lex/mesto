import Popup from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popUpSelector, handleFormSubmit, formValidator, resetFormCheck) {
    super(popUpSelector);
    this._formValidator = formValidator;
    this._resetFormCheck = resetFormCheck;
    this._form = document
      .querySelector(popUpSelector)
      .querySelector(".dialog__content");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._form.querySelectorAll(".dialog__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  open() {
    super.open();
    this._formValidator.resetForm(this._resetFormCheck);
  }

  close() {
    super.close();
    this._formValidator.resetForm(this._resetFormCheck);
  }

  setInputsValues({ name, about }) {
    this._inputList[0].value = name;
    this._inputList[1].value = about;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
