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
const addCardInputTitle = addCardForm.elements.inputName;
const addCardInputUrl = addCardForm.elements.inputImageUrl;

const cardZoomPopUp = document.querySelector(".dialog_detail-card");
const cardZoomCloseBtn = cardZoomPopUp.querySelector(
  ".dialog__close-button_card"
);
const cardZoomImg = cardZoomPopUp.querySelector(".dialog__img-card");
const cardZoomLabel = cardZoomPopUp.querySelector(".dialog__title-card");

const cardTemplate = document.querySelector("#card").content;
const gallery = document.querySelector(".gallery");

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

for (let index = 0; index < initialCards.length; index++) {
  gallery.append(
    createCard(initialCards[index].name, initialCards[index].link)
  );
}

function togglePopUp(popUp) {
  popUp.classList.toggle("dialog_show");
}

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".gallery__img");
  const cardTrash = cardElement.querySelector(".gallery__trash");
  const cardTitle = cardElement.querySelector(".gallery__title");
  const cardLike = cardElement.querySelector(".gallery__like");

  cardImg.src = link;
  cardImg.addEventListener("click", function () {
    cardZoomImg.src = link;
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
    resetUserEditPopUpValue();
  }

  togglePopUp(editProfilePopUp);
  resetError(editProfileForm);
}
//клик по кнопке редактирования профиля

//клик по кнопке добавления новой карточки
function toggleAddCardPopUp() {
  togglePopUp(addCardPopUp);
  resetError(addCardForm);
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

dialogs.forEach(function (dialog) {
  dialog.addEventListener("click", function (evt) {
    if (
      evt.target.classList.contains("dialog") ||
      evt.target.classList.contains("dialog__form")
    ) {
      togglePopUp(dialog);
    }
  });

  const inputList = Array.from(dialog.querySelectorAll(".dialog__input"));
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("keydown", function (evt) {
      evt.preventDefault;
      if (evt.key === "Escape") {
        togglePopUp(dialog);
      }
    });
  });
});

editProfileBtn.addEventListener("click", toggleUserEditPopUp);
editProfileCloseBtn.addEventListener("click", toggleUserEditPopUp);
editProfileForm.addEventListener("submit", userEditFormHandler);

addCardBtn.addEventListener("click", toggleAddCardPopUp);
addCardCloseBtn.addEventListener("click", toggleAddCardPopUp);
addCardForm.addEventListener("submit", addCardFormHandler);

cardZoomCloseBtn.addEventListener("click", toggleCardZoomPopUp);
