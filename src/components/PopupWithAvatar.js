import Popup from "./Popup.js";
export class PopupWithAvatar extends Popup {
  constructor(popUpSelector, handleFormSubmit, formValidatorReset) {
    super(popUpSelector);
    this._formValidatorReset = formValidatorReset;
    this._form = document
      .querySelector(popUpSelector)
      .querySelector(".dialog__content");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = Array.from(this._form.querySelectorAll(".dialog__input"));
    this._submit = this._form.querySelector(".dialog__submit");
    this._submitText = this._submit.textContent;
  }

  _getNewAvatar() {
    this._newAvatarUrl = "";
    this._inputList.forEach((input) => {
      if (input.name === "inputNewImageUrl") {
        this._newAvatarUrl = input.value;
      }
    });
  }

  open() {
    super.open();
    this._formValidatorReset();
  }

  close() {
    super.close();
    this._formValidatorReset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit.textContent = "Сохранение...";

      this._getNewAvatar();
      this._handleFormSubmit(this._newAvatarUrl).then(() => {
        this.close();
        this._submit.textContent = this._submitText;
      });
    });
  }
}
