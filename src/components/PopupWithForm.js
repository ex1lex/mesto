import Popup from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popUpSelector, handleFormSubmit, formValidatorReset) {
    super(popUpSelector);
    this._formValidatorReset = formValidatorReset;
    this._form = document
      .querySelector(popUpSelector)
      .querySelector(".dialog__content");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._form.querySelectorAll(".dialog__input"));
    this._submit = this._form.querySelector(".dialog__submit");
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
    this._formValidatorReset();
  }

  close() {
    super.close();
    this._formValidatorReset();
  }

  setInputsValues(values) {
    this._inputList.forEach((input) => {
      input.value = values[input.name] || "";
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit.textContent = "Сохранение...";
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
