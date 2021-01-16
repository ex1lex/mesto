import Popup from "./Popup.js";
export class PopupWithDeleteForm extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._form = document
      .querySelector(popUpSelector)
      .querySelector(".dialog__content");
  }

  open(card) {
    super.open();
    this._card = card;
  }

  close() {
    super.close();
    this._card.remove();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.close();
    });
  }
}
