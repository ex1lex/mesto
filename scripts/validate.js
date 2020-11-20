function showError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.name}Error`);
  const btn = formElement.querySelector(".dialog__submit");
  btn.classList.add("dialog__submit_disabled");
  btn.disabled = true;
  inputElement.classList.add("dialog__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("dialog__error-label_show");
}

function hideError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.name}Error`);
  const btn = formElement.querySelector(".dialog__submit");
  btn.classList.remove("dialog__submit_disabled");
  btn.disabled = false;
  inputElement.classList.remove("dialog__input_error");
  errorElement.classList.remove("dialog__error-label_show");
  errorElement.textContent = "";
}

function resetError(formElement) {
  const formInput = Array.from(
    document.querySelectorAll(".dialog__input_error")
  );
  const btn = formElement.querySelector(".dialog__submit");
  btn.classList.remove("dialog__submit_disabled");
  btn.disabled = false;
  formInput.forEach(function (input) {
    const errorElement = formElement.querySelector(`#${input.name}Error`);
    input.classList.remove("dialog__input_error");
    errorElement.classList.remove("dialog__error-label_show");
    errorElement.textContent = "";
  });
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".dialog__input"));
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
    });
  });
}

function enableValidation() {
  let formList = Array.from(document.querySelectorAll(".dialog__content"));
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
enableValidation();
