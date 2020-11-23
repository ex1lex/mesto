function showError(options, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.name}Error`);
  const btn = formElement.querySelector(options.submitButtonSelector);
  btn.classList.add(options.inactiveButtonClass);
  btn.disabled = true;
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
}

function hideError(options, formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.name}Error`);
  const btn = formElement.querySelector(options.submitButtonSelector);
  btn.classList.remove(options.inactiveButtonClass);
  btn.disabled = false;
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
}

function resetError(options, formElement) {
  const formInput = Array.from(
    document.querySelectorAll(options.inputErrorClass)
  );
  const btn = formElement.querySelector(options.submitButtonSelector);
  btn.classList.remove(options.inactiveButtonClass);
  btn.disabled = false;
  formInput.forEach(function (input) {
    const errorElement = formElement.querySelector(`#${input.name}Error`);
    input.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = "";
  });
}

function checkInputValidity(options, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showError(
      options,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideError(options, formElement, inputElement);
  }
}

function setEventListeners(options, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      checkInputValidity(options, formElement, inputElement);
    });
  });
}

function enableValidation(options) {
  let formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(options, formElement);
  });
}
