export default class Popup {
  constructor(popUpSelector) {
    this._popUp = document.querySelector(popUpSelector);
    this._closeBtn = this._popUp.querySelector(".dialog__close-button");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popUp.classList.add("dialog_show");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popUp.classList.remove("dialog_show");
    document.removeEventListener("keydown", this._handleEscClose);
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
    this._closeBtn.addEventListener("click", (evt) => {
      this.close();
    });
  }
}
