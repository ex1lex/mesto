export default class Popup {
  constructor(popUpSelector) {
    this._popUp = document.querySelector(popUpSelector);
    this._closeBtn = this._popUp.querySelector(".dialog__close-button");
  }

  open() {
    this._popUp.classList.add("dialog_show");
  }

  close() {
    this._popUp.classList.remove("dialog_show");
  }

  _closeByOverlay(evt) {
    if (
      evt.target.classList.contains("dialog") ||
      evt.target.classList.contains("dialog__form") ||
      evt.target.classList.contains("dialog__content-card")
    ) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    evt.preventDefault;

    if (this._popUp.classList.contains("dialog_show") && evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popUp.addEventListener("click", (evt) => {
      this._closeByOverlay(evt);
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
      //анонимную функцию невозможно удалить
    });
    this._closeBtn.addEventListener("click", (evt) => {
      this.close();
    });
  }
}
