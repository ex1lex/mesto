export const addCardBtn = document.querySelector(
  ".profile-container__add-button"
);
export const editProfileBtn = document.querySelector(".profile__edit-button");
export const editAvatarBtn = document.querySelector(".profile__avatar-btn");
export const gallery = document.querySelector(".gallery");
export const addCardSubmit = document.forms.addCardForm.querySelector(
  ".dialog__submit"
);
export const editUserInfoSubmit = document.forms.editProfileForm.querySelector(
  ".dialog__submit"
);
export const editAvatarSubmit = document.forms.editAvatarForm.querySelector(
  ".dialog__submit"
);
export const deleteCardSubmit = document.forms.deleteCardForm.querySelector(
  ".dialog__submit"
);

export const userSelectors = {
  selectorName: ".profile__title",
  selectorAbout: ".profile__subtitle",
  selectorAvatar: ".profile__avatar",
};

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
