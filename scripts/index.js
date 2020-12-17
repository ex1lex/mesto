import * as data from "./Constants.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const user = new UserInfo(data.userSelectors);

const editProfileFormValidator = new FormValidator(data.formEditProfileOptions);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(data.formAddCardOptions);
addCardFormValidator.enableValidation();

const popUpUserForm = new PopupWithForm(
  ".dialog_edit-profile",
  handleUserEditFormSubmit,
  editProfileFormValidator,
  true
);
popUpUserForm.setEventListeners();

const popUpAddCardForm = new PopupWithForm(
  ".dialog_add-card",
  handleAddCardFormSubmit,
  addCardFormValidator,
  false
);
popUpAddCardForm.setEventListeners();

const popUpImage = new PopupWithImage(".dialog_detail-card");
popUpImage.setEventListeners();

//клик по карточке
function toggleCardZoomPopUp(evt) {
  popUpImage.open(evt);
}
//клик по карточке

//Заполнение галереи карточками
function createNewCard({ name, link }) {
  const card = new Card(name, link, "#card", toggleCardZoomPopUp);
  data.gallery.prepend(card.generateCard());
}

const sectionOptions = { items: data.initialCards, renderer: createNewCard };
const section = new Section(sectionOptions, ".gallery");
section.renderItems();
//Заполнение галереи карточками

//клик по кнопке редактирования профиля
data.editProfileBtn.addEventListener("click", () => {
  popUpUserForm.open();
  popUpUserForm.setInputsValues(user.getUserInfo());
});
//клик по кнопке редактирования профиля

//клик по кнопке добавления новой карточки
data.addCardBtn.addEventListener("click", () => {
  popUpAddCardForm.open();
});
//клик по кнопке добавления новой карточки

//обработчики форм
function handleUserEditFormSubmit(values) {
  user.setUserInfo(values);
  this.close();
}

function handleAddCardFormSubmit(values) {
  const card = new Card(
    values.inputTitle,
    values.inputImageUrl,
    "#card",
    toggleCardZoomPopUp
  );
  section.addItem(card.generateCard());
  this.close();
}
//обработчики форм
