import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this._img = document.querySelector(".dialog__img-card");
    this._label = document.querySelector(".dialog__title-card");
  }

  open(link, alt) {
    this._img.src = link;
    this._img.alt = alt;
    this._label.textContent = alt;
    super.open();
  }
}
