export default class Popup {
  constructor(popUpSelector) {
    this._selector = document.querySelector(popUpSelector);
    this._closeBtn = this._selector.querySelector(".dialog__close-button");
  }

  open() {
    this._selector.classList.add("dialog_show");
  }

  close() {
    this._selector.classList.remove("dialog_show");
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

    if (
      this._selector.classList.contains("dialog_show") &&
      evt.key === "Escape"
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener("click", (evt) => {
      this._closeByOverlay(evt);
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this._closeBtn.addEventListener("click", (evt) => {
      this.close();
    });
  }
}
