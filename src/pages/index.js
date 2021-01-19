import "./index.css";
import * as data from "../utils/Constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithDeleteForm } from "../components/PopupWithDeleteForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-19",
  "89348099-1c1a-4669-810a-e3803229c3b9"
);

const user = new UserInfo(data.userSelectors);

const editProfileFormValidator = new FormValidator(data.formEditProfileOptions);
editProfileFormValidator.enableValidation();

const editProfileAvatarFormValidator = new FormValidator(
  data.formEditProfileAvatarOptions
);
editProfileAvatarFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(data.formAddCardOptions);
addCardFormValidator.enableValidation();

const setDefaultTextBtn = (btn, text) => {
  btn.textContent = text;
};

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userInfo, initialCards]) => {
    user.setUserInfo(userInfo.name, userInfo.about);
    user.setUserAvatar(userInfo.avatar);

    const popUpAvatar = new PopupWithForm(
      ".dialog_edit-avatar",
      (value) => {
        api
          .setUserAvatar(value)
          .then((info) => {
            user.setUserAvatar(info.avatar);
          })
          .catch(api.catch)
          .finally(() => {
            setDefaultTextBtn(data.editAvatarSubmit, "Сохранить");
          });
      },
      () => editProfileAvatarFormValidator.resetForm(false)
    );
    popUpAvatar.setEventListeners();

    //клик по кнопке редактирования аватара
    data.editAvatarBtn.addEventListener("click", () => {
      popUpAvatar.open();
    });
    //клик по кнопке редактирования аватара

    const popUpUserForm = new PopupWithForm(
      ".dialog_edit-profile",
      (values) => {
        api
          .setUserInfo(values)
          .then((data) => {
            user.setUserInfo(data.name, data.about);
          })
          .catch(api.catch)
          .finally(() => {
            dsetDefaultTextBtn(data.editUserInfoSubmit, "Сохранить");
          });
      },
      () => editProfileFormValidator.resetForm(true)
    );
    popUpUserForm.setEventListeners();

    //клик по кнопке редактирования профиля
    data.editProfileBtn.addEventListener("click", () => {
      popUpUserForm.open();
      popUpUserForm.setInputsValues(user.getUserInfo());
    });
    //клик по кнопке редактирования профиля

    const popUpImage = new PopupWithImage(".dialog_detail-card");
    popUpImage.setEventListeners();

    const popUpDeleteCardForm = new PopupWithDeleteForm(
      ".dialog_delete-card",
      (id) => {
        return new Promise((res) => {
          api.deleteCard(id).then((data) => {
            res();
          });
        })
          .catch(api.catch)
          .finally(() => {
            setDefaultTextBtn(data.deleteCardSubmit, "Да");
          });
      }
    );
    popUpDeleteCardForm.setEventListeners();

    const createNewCard = (item) => {
      const card = new Card(
        item,
        "#card",
        (link, alt) => {
          popUpImage.open(link, alt);
        },
        popUpDeleteCardForm,
        () => {
          return new Promise((res) => {
            res(userInfo);
          }).catch(api.catch);
        },
        (id) => {
          return new Promise((res) => {
            api.setLike(id).then((data) => {
              res(data);
            });
          }).catch(api.catch);
        },
        (id) => {
          return new Promise((res) => {
            api.deleteLike(id).then((data) => {
              res(data);
            });
          }).catch(api.catch);
        }
      );
      section.addItem(card.generateCard());
    };

    const popUpAddCardForm = new PopupWithForm(
      ".dialog_add-card",
      (values) => {
        api
          .addNewCard(values.inputTitle, values.inputImageUrl)
          .then((card) => {
            createNewCard(card);
          })
          .catch(api.catch)
          .finally(() => {
            setDefaultTextBtn(data.addCardSubmit, "Сохранить");
          });
      },
      () => addCardFormValidator.resetForm(false)
    );
    popUpAddCardForm.setEventListeners();

    //клик по кнопке добавления новой карточки
    data.addCardBtn.addEventListener("click", () => {
      popUpAddCardForm.open();
    });
    //клик по кнопке добавления новой карточки

    const cards = initialCards.reverse();
    const section = new Section(
      { items: cards, renderer: createNewCard },
      ".gallery"
    );
    section.renderItems();
  }
);
