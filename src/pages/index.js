import "./index.css";
import * as data from "../utils/Constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithDeleteForm } from "../components/PopupWithDeleteForm.js";
import { PopupWithAvatar } from "../components/PopupWithAvatar.js";
import { UserInfo } from "../components/UserInfo.js";

const user = new UserInfo(data.userSelectors);

const editProfileFormValidator = new FormValidator(data.formEditProfileOptions);
editProfileFormValidator.enableValidation();

const editProfileAvatarFormValidator = new FormValidator(
  data.formEditProfileAvatarOptions
);
editProfileAvatarFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(data.formAddCardOptions);
addCardFormValidator.enableValidation();

const popUpDeleteCardForm = new PopupWithDeleteForm(".dialog_delete-card");
popUpDeleteCardForm.setEventListeners();

//обработчики форм
const handleAvatarFormSubmit = (value) => {
  data.avatar.src = value;
};

const handleUserEditFormSubmit = (values) => {
  user.setUserInfo(values);
};

const handleAddCardFormSubmit = (values) => {
  const card = new Card(
    values.inputTitle,
    values.inputImageUrl,
    "#card",
    toggleCardZoomPopUp,
    popUpDeleteCardForm
  );
  section.addItem(card.generateCard());
};
//обработчики форм

const popUpAvatar = new PopupWithAvatar(
  ".dialog_edit-avatar",
  handleAvatarFormSubmit,
  () => editProfileAvatarFormValidator.resetForm(false)
);
popUpAvatar.setEventListeners();

const popUpUserForm = new PopupWithForm(
  ".dialog_edit-profile",
  handleUserEditFormSubmit,
  () => editProfileFormValidator.resetForm(true)
);
popUpUserForm.setEventListeners();

const popUpAddCardForm = new PopupWithForm(
  ".dialog_add-card",
  handleAddCardFormSubmit,
  () => addCardFormValidator.resetForm(false)
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
  const card = new Card(
    name,
    link,
    "#card",
    toggleCardZoomPopUp,
    popUpDeleteCardForm
  );
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

//клик по кнопке редактирования аватара
data.editAvatarBtn.addEventListener("click", () => {
  popUpAvatar.open();
});
//клик по кнопке редактирования аватара

//клик по кнопке добавления новой карточки
data.addCardBtn.addEventListener("click", () => {
  popUpAddCardForm.open();
});
//клик по кнопке добавления новой карточки
