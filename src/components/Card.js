export class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    deletePopup,
    getUserInfoFunction,
    setLikeFunction,
    deleteLikeFunction
  ) {
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._name = data.name;
    this._id = data._id;
    this._link = data.link;
    this._author = data.owner._id;
    this._likes = data.likes;
    this._deletePopup = deletePopup;
    this._getUserInfo = getUserInfoFunction;
    this._setLike = setLikeFunction;
    this._deleteLike = deleteLikeFunction;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    return cardElement;
  }

  _likeClick() {
    this._like = this._element.querySelector(".gallery__like");
    this._likeCount = this._element.querySelector(".gallery__like-count");

    if (this._like.classList.contains("gallery__like_active")) {
      this._deleteLike(this._id).then((card) => {
        if (card.likes.length > 0) {
          this._likeCount.textContent = card.likes.length;
        } else this._likeCount.textContent = "";
        this._like.classList.remove("gallery__like_active");
      });
    } else {
      this._setLike(this._id).then((card) => {
        this._likeCount.textContent = card.likes.length;
        this._like.classList.add("gallery__like_active");
      });
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__trash")
      .addEventListener("click", () => {
        this._deletePopup.open(this._element, this._id);
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
    const trash = element.querySelector(".gallery__trash");
    const like = element.querySelector(".gallery__like");
    const cardLikes = element.querySelector(".gallery__like-count");

    cardImg.src = this._link;
    cardImg.alt = this._name;

    cardTitle.textContent = this._name;

    this._getUserInfo().then((info) => {
      if (info._id != this._author) {
        trash.remove();
      }

      if (this._likes.length > 0) {
        cardLikes.textContent = this._likes.length;
      }

      this._likes.forEach((element) => {
        if (element._id === info._id) {
          like.classList.add("gallery__like_active");
        }
      });
    });

    this._element = element;
    this._setEventListeners();

    return this._element;
  }
}
