const addCardBtn = document.querySelector(".profile-container__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");

const dialogs = Array.from(document.querySelectorAll(".dialog"));

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
const cardZoomImg = cardZoomPopUp.querySelector(".dialog__img-card");
const cardZoomLabel = cardZoomPopUp.querySelector(".dialog__title-card");

const cardTemplate = document.querySelector("#card").content;
const gallery = document.querySelector(".gallery");

const formsOptions = {
  formSelector: ".dialog__content",
  inputSelector: ".dialog__input",
  submitButtonSelector: ".dialog__submit",
  inactiveButtonClass: "dialog__submit_disabled",
  inputErrorClass: "dialog__input_error",
  errorClass: "dialog__error-label_show",
};

//открытие popUp
function popUpOverlayClick(evt) {
  if (
    evt.target.classList.contains("dialog") ||
    evt.target.classList.contains("dialog__form")
  ) {
    togglePopUp(popUp);
  }
}

function popUpEscapeClick(evt) {
  evt.preventDefault;
  const popUp = document.querySelector(".dialog_show");
  if (popUp && evt.key === "Escape") {
    togglePopUp(popUp);
  }
}

function togglePopUp(popUp) {
  popUp.classList.toggle("dialog_show");

  if (popUp.classList.contains("dialog_show")) {
    document.addEventListener("keydown", popUpEscapeClick);
    popUp.addEventListener("click", popUpOverlayClick);
  } else {
    document.removeEventListener("keydown", popUpEscapeClick);
    popUp.removeEventListener("click", popUpOverlayClick);
  }
}
//открытие popUp

//Заполнение галереи карточками
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

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".gallery__img");
  const cardTrash = cardElement.querySelector(".gallery__trash");
  const cardTitle = cardElement.querySelector(".gallery__title");
  const cardLike = cardElement.querySelector(".gallery__like");

  cardImg.src = link;
  cardImg.alt = "картинка галереи";
  cardImg.addEventListener("click", function () {
    cardZoomImg.src = link;
    cardZoomImg.alt = "детальная картинка галереи";
    cardZoomLabel.textContent = name;
    toggleCardZoomPopUp();
  });

  cardTrash.addEventListener("click", function (event) {
    const card = event.target.closest(".gallery__item");
    card.remove();
  });

  cardTitle.textContent = name;

  cardLike.addEventListener("click", function (event) {
    event.target.classList.toggle("gallery__like_active");
  });

  return cardElement;
}

for (let index = 0; index < initialCards.length; index++) {
  gallery.append(
    createCard(initialCards[index].name, initialCards[index].link)
  );
}
//Заполнение галереи карточками

//Обновление полей в диалоговом окне редактирования профиля
function resetUserEditPopUpValue() {
  editProfileInputTitle.value = profileTitle.textContent;
  editProfileInputSubTitle.value = profileSubTitle.textContent;
}
//Обновление полей в диалоговом окне редактирования профиля

//клик по кнопке редактирования профиля
function toggleUserEditPopUp() {
  if (!editProfilePopUp.classList.contains("dialog_show")) {
    resetForm(formsOptions, editProfileForm);
    resetUserEditPopUpValue();
  }

  togglePopUp(editProfilePopUp);
}
//клик по кнопке редактирования профиля

//клик по кнопке добавления новой карточки
function toggleAddCardPopUp() {
  if (!addCardPopUp.classList.contains("dialog_show")) {
    resetForm(formsOptions, addCardForm);
  }

  togglePopUp(addCardPopUp);
}
//клик по кнопке добавления новой карточки

//клик по карточке
function toggleCardZoomPopUp() {
  togglePopUp(cardZoomPopUp);
}
//клик по карточке

//обработчики форм
function userEditFormHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = editProfileInputTitle.value;
  profileSubTitle.textContent = editProfileInputSubTitle.value;
  toggleUserEditPopUp();
}

function addCardFormHandler(evt) {
  evt.preventDefault();

  gallery.prepend(createCard(addCardInputTitle.value, addCardInputUrl.value));
  toggleAddCardPopUp();
  addCardInputTitle.value = "";
  addCardInputUrl.value = "";
}
//обработчики форм

enableValidation(formsOptions);

editProfileBtn.addEventListener("click", toggleUserEditPopUp);
editProfileCloseBtn.addEventListener("click", toggleUserEditPopUp);
editProfileForm.addEventListener("submit", userEditFormHandler);

addCardBtn.addEventListener("click", toggleAddCardPopUp);
addCardCloseBtn.addEventListener("click", toggleAddCardPopUp);
addCardForm.addEventListener("submit", addCardFormHandler);

cardZoomCloseBtn.addEventListener("click", toggleCardZoomPopUp);
