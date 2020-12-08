import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const addCardBtn = document.querySelector(".profile-container__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");

const editProfilePopUp = document.querySelector(".dialog_edit-profile");
const editProfileCloseBtn = editProfilePopUp.querySelector(
  ".dialog__close-button"
);
const editProfileForm = document.forms.editProfileForm;
const editProfileInputTitle = editProfileForm.elements.inputName;
const editProfileInputSubTitle = editProfileForm.elements.inputAbout;

const addCardPopUp = document.querySelector(".dialog_add-card");
const addCardCloseBtn = addCardPopUp.querySelector(".dialog__close-button");
const addCardForm = document.forms.addCardForm;
const addCardInputTitle = addCardForm.elements.inputTitle;
const addCardInputUrl = addCardForm.elements.inputImageUrl;

const cardZoomPopUp = document.querySelector(".dialog_detail-card");
const cardZoomCloseBtn = cardZoomPopUp.querySelector(
  ".dialog__close-button_card"
);
const gallery = document.querySelector(".gallery");

const initialCards = [
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

const cardOptions = {
  cardSelector: "#card",
  popUpSelector: ".dialog_detail-card",
  toggleCardZoom: toggleCardZoomPopUp,
};

const formEditProfileOptions = {
  formSelector: document.querySelector("#editProfileForm"),
  inputSelector: ".dialog__input",
  submitButtonSelector: ".dialog__submit",
  inactiveButtonClass: "dialog__submit_disabled",
  inputErrorClass: "dialog__input_error",
  errorClass: "dialog__error-label_show",
};

const formAddCardOptions = {
  formSelector: document.querySelector("#addCardForm"),
  inputSelector: ".dialog__input",
  submitButtonSelector: ".dialog__submit",
  inactiveButtonClass: "dialog__submit_disabled",
  inputErrorClass: "dialog__input_error",
  errorClass: "dialog__error-label_show",
};

const editProfileFormValidator = new FormValidator(formEditProfileOptions);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(formAddCardOptions);
addCardFormValidator.enableValidation();

//открытие popUp
function popUpOverlayClick(evt) {
  const popUp = document.querySelector(".dialog_show");
  if (
    evt.target.classList.contains("dialog") ||
    evt.target.classList.contains("dialog__form") ||
    evt.target.classList.contains("dialog__content-card")
  ) {
    togglePopUp(popUp);
  }
}

function closePopupByOverlay(evt) {
  evt.preventDefault;
  const popUp = document.querySelector(".dialog_show");
  if (popUp && evt.key === "Escape") {
    togglePopUp(popUp);
  }
}

function togglePopUp(popUp) {
  popUp.classList.toggle("dialog_show");

  if (popUp.classList.contains("dialog_show")) {
    document.addEventListener("keydown", closePopupByOverlay);
    popUp.addEventListener("click", popUpOverlayClick);
  } else {
    document.removeEventListener("keydown", closePopupByOverlay);
    popUp.removeEventListener("click", popUpOverlayClick);
  }
}
//открытие popUp

//Обновление полей в диалоговом окне редактирования профиля
function resetUserEditPopUpValue() {
  editProfileInputTitle.value = profileTitle.textContent;
  editProfileInputSubTitle.value = profileSubTitle.textContent;
}
//Обновление полей в диалоговом окне редактирования профиля

//клик по кнопке редактирования профиля
function toggleUserEditPopUp() {
  if (!editProfilePopUp.classList.contains("dialog_show")) {
    editProfileFormValidator.resetForm(true);
    resetUserEditPopUpValue();
  }

  togglePopUp(editProfilePopUp);
}
//клик по кнопке редактирования профиля

//клик по кнопке добавления новой карточки
function toggleAddCardPopUp() {
  if (!addCardPopUp.classList.contains("dialog_show")) {
    addCardFormValidator.resetForm(false);
  }

  togglePopUp(addCardPopUp);
}
//клик по кнопке добавления новой карточки

//клик по карточке
function setCardZoomPopUpValues(evt) {
  const popUp = cardZoomPopUp;
  const cardZoomImg = popUp.querySelector(".dialog__img-card");
  const cardZoomLabel = popUp.querySelector(".dialog__title-card");

  cardZoomImg.src = evt.target.src;
  cardZoomImg.alt = "детальная картинка галереи";
  cardZoomLabel.textContent = evt.target.alt;
}

function toggleCardZoomPopUp(evt) {
  setCardZoomPopUpValues(evt);
  togglePopUp(cardZoomPopUp);
}
//клик по карточке

//обработчики форм
function handleUserEditFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = editProfileInputTitle.value;
  profileSubTitle.textContent = editProfileInputSubTitle.value;
  toggleUserEditPopUp();
}

function createNewCard() {
  const card = new Card(cardOptions);
  gallery.prepend(card.generateCard());
}

function addCardFormHandler(evt) {
  evt.preventDefault();

  cardOptions.name = addCardInputTitle.value;
  cardOptions.link = addCardInputUrl.value;
  createNewCard();
  toggleAddCardPopUp();
  addCardInputTitle.value = "";
  addCardInputUrl.value = "";
}
//обработчики форм

//Заполнение галереи карточками
for (let index = 0; index < initialCards.length; index++) {
  cardOptions.name = initialCards[index].name;
  cardOptions.link = initialCards[index].link;
  createNewCard();
}
//Заполнение галереи карточками

editProfileBtn.addEventListener("click", toggleUserEditPopUp);
editProfileCloseBtn.addEventListener("click", toggleUserEditPopUp);
editProfileForm.addEventListener("submit", handleUserEditFormSubmit);

addCardBtn.addEventListener("click", toggleAddCardPopUp);
addCardCloseBtn.addEventListener("click", toggleAddCardPopUp);
addCardForm.addEventListener("submit", addCardFormHandler);

cardZoomCloseBtn.addEventListener("click", toggleCardZoomPopUp);
