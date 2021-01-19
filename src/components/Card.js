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
    this._setLikeFunction = setLikeFunction;
    this._deleteLikeFunction = deleteLikeFunction;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    return cardElement;
  }

  _setLike(count) {
    this._likeCount.textContent = count;
    this._like.classList.add("gallery__like_active");
  }

  _deleteLike(count) {
    if (count > 0) {
      this._likeCount.textContent = count;
    } else this._likeCount.textContent = "";
    this._like.classList.remove("gallery__like_active");
  }

  _likeClick() {
    if (this._like.classList.contains("gallery__like_active")) {
      this._deleteLikeFunction(this._id).then((card) => {
        this._deleteLike(card.likes.length);
      });
    } else {
      this._setLikeFunction(this._id).then((card) => {
        this._setLike(card.likes.length);
      });
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__trash")
      .addEventListener("click", () => {
        this._deletePopup.open(() => {
          this._element.remove();
        }, this._id);
      });

    this._element
      .querySelector(".gallery__like")
      .addEventListener("click", () => {
        this._likeClick();
      });

    this._element
      .querySelector(".gallery__img")
      .addEventListener("click", () => {
        this._handleCardClick(this._link, this._name);
      });
  }

  generateCard() {
    const element = this._getTemplate();
    const cardImg = element.querySelector(".gallery__img");
    const cardTitle = element.querySelector(".gallery__title");
    const trash = element.querySelector(".gallery__trash");
    this._like = element.querySelector(".gallery__like");
    this._likeCount = element.querySelector(".gallery__like-count");

    cardImg.src = this._link;
    cardImg.alt = this._name;

    cardTitle.textContent = this._name;

    this._getUserInfo().then((info) => {
      if (info._id != this._author) {
        trash.remove();
      }

      if (this._likes.length > 0) {
        this._likeCount.textContent = this._likes.length;
      }

      this._likes.forEach((element) => {
        if (element._id === info._id) {
          this._like.classList.add("gallery__like_active");
        }
      });
    });

    this._element = element;
    this._setEventListeners();

    return this._element;
  }
}
