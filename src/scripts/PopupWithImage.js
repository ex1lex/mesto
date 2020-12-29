import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._img = document.querySelector(".dialog__img-card");
    this._label = document.querySelector(".dialog__title-card");
  }

  open(evt) {
    this._img.src = evt.target.src;
    this._img.alt = "детальная картинка галереи";
    this._label.textContent = evt.target.alt;
    super.open();
  }
}
