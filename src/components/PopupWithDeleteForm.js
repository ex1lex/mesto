import Popup from "./Popup.js";
export class PopupWithDeleteForm extends Popup {
  constructor(popUpSelector, deleteCardFunction) {
    super(popUpSelector);
    this._form = document
      .querySelector(popUpSelector)
      .querySelector(".dialog__content");
    this._deleteCard = deleteCardFunction;
    this._submit = this._form.querySelector(".dialog__submit");
  }

  open(remove, cardId) {
    super.open();
    this._remove = remove;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit.textContent = "Удаление...";
      this._deleteCard(this._cardId).then((data) => {
        this._remove();
        super.close();
      });
    });
  }
}
