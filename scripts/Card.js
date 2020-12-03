export class Card {
  constructor(options) {
    this._cardSelector = options.cardSelector;
    this._popUpElement = document.querySelector(options.popUpSelector);
    this._toggleCardZoom = options.toggleCardZoom;
    this._name = options.name;
    this._link = options.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    return cardElement;
  }

  _trashClick() {
    this._element.remove();
  }

  _likeClick() {
    this._element
      .querySelector(".gallery__like")
      .classList.toggle("gallery__like_active");
  }

  _imgClick() {
    const popUp = this._popUpElement;
    const cardZoomImg = popUp.querySelector(".dialog__img-card");
    const cardZoomLabel = popUp.querySelector(".dialog__title-card");

    cardZoomImg.src = this._link;
    cardZoomImg.alt = "детальная картинка галереи";
    cardZoomLabel.textContent = this._name;
    this._toggleCardZoom();
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__trash")
      .addEventListener("click", () => {
        this._trashClick();
      });

    this._element
      .querySelector(".gallery__like")
      .addEventListener("click", () => {
        console.log("!");
        this._likeClick();
      });

    this._element
      .querySelector(".gallery__img")
      .addEventListener("click", () => {
        this._imgClick();
      });
  }

  generateCard() {
    const element = this._getTemplate();
    const cardImg = element.querySelector(".gallery__img");
    const cardTitle = element.querySelector(".gallery__title");

    cardImg.src = this._link;
    cardImg.alt = "картинка галереи";

    cardTitle.textContent = this._name;

    this._element = element;
    this._setEventListeners();
    return this._element;
  }
}
