export const addCardBtn = document.querySelector(
  ".profile-container__add-button"
);
export const avatar = document.querySelector(".profile__avatar");
export const editProfileBtn = document.querySelector(".profile__edit-button");
export const editAvatarBtn = document.querySelector(".profile__avatar-btn");
export const gallery = document.querySelector(".gallery");

export const userSelectors = {
  selectorName: ".profile__title",
  selectorAbout: ".profile__subtitle",
};

export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const formEditProfileOptions = {
  formSelector: document.querySelector("#editProfileForm"),
  inputSelector: ".dialog__input",
  submitButtonSelector: ".dialog__submit",
  inactiveButtonClass: "dialog__submit_disabled",
  inputErrorClass: "dialog__input_error",
  errorClass: "dialog__error-label_show",
};

export const formEditProfileAvatarOptions = {
  formSelector: document.querySelector("#editAvatarForm"),
  inputSelector: ".dialog__input",
  submitButtonSelector: ".dialog__submit",
  inactiveButtonClass: "dialog__submit_disabled",
  inputErrorClass: "dialog__input_error",
  errorClass: "dialog__error-label_show",
};

export const formAddCardOptions = {
  formSelector: document.querySelector("#addCardForm"),
  inputSelector: ".dialog__input",
  submitButtonSelector: ".dialog__submit",
  inactiveButtonClass: "dialog__submit_disabled",
  inputErrorClass: "dialog__input_error",
  errorClass: "dialog__error-label_show",
};
