export class Card {
  constructor(name, link, cardSelector, handleCardClick, deletePopup) {
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._name = name;
    this._link = link;
    this._deletePopup = deletePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    return cardElement;
  }

  _likeClick() {
    this._element
      .querySelector(".gallery__like")
      .classList.toggle("gallery__like_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__trash")
      .addEventListener("click", () => {
        this._deletePopup.open(this._element);
      });

    this._element
      .querySelector(".gallery__like")
      .addEventListener("click", () => {
        this._likeClick();
      });

    this._element
      .querySelector(".gallery__img")
      .addEventListener("click", (evt) => {
        this._handleCardClick(evt);
      });
  }

  generateCard() {
    const element = this._getTemplate();
    const cardImg = element.querySelector(".gallery__img");
    const cardTitle = element.querySelector(".gallery__title");

    cardImg.src = this._link;
    cardImg.alt = this._name;

    cardTitle.textContent = this._name;

    this._element = element;
    this._setEventListeners();
    return this._element;
  }
}