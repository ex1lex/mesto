import "./pages/index.css";
import * as data from "./scripts/Constants.js";
import { Card } from "./scripts/Card.js";
import { Section } from "./scripts/Section.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { PopupWithImage } from "./scripts/PopupWithImage.js";
import { PopupWithForm } from "./scripts/PopupWithForm.js";
import { UserInfo } from "./scripts/UserInfo.js";

const user = new UserInfo(data.userSelectors);

const editProfileFormValidator = new FormValidator(data.formEditProfileOptions);
editProfileFormValidator.enableValidation();
const addCardFormValidator = new FormValidator(data.formAddCardOptions);
addCardFormValidator.enableValidation();

//обработчики форм
const handleUserEditFormSubmit = (values) => {
  user.setUserInfo(values);
};

const handleAddCardFormSubmit = (values) => {
  const card = new Card(
    values.inputTitle,
    values.inputImageUrl,
    "#card",
    toggleCardZoomPopUp
  );
  section.addItem(card.generateCard());
};
//обработчики форм

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
const toggleCardZoomPopUp = (evt) => {
  popUpImage.open(evt);
};
//клик по карточке

//Заполнение галереи карточками
const createNewCard = ({ name, link }) => {
  const card = new Card(name, link, "#card", toggleCardZoomPopUp);
  data.gallery.prepend(card.generateCard());
};

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
