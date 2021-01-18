import Popup from "./Popup.js";
export class PopupWithDeleteForm extends Popup {
  constructor(popUpSelector, deleteCardFunction) {
    super(popUpSelector);
    this._form = document
      .querySelector(popUpSelector)
      .querySelector(".dialog__content");
    this._deleteCard = deleteCardFunction;
    this._submit = this._form.querySelector(".dialog__submit");
    this._submitText = this._submit.textContent;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit.textContent = "Удаление...";
      this._deleteCard(this._cardId).then((data) => {
        this._card.remove();
        super.close();
        this._submit.textContent = this._submitText;
      });
    });
  }
}
