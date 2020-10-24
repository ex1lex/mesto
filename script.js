
let editProfileBtn = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');

let closeBtn = document.querySelector('.form__close-button');
let popUp = document.querySelector('.form-container');
let inputTitle = document.querySelector('.form__input_name');
let inputSubTitle = document.querySelector('.form__input_about');

function togglePopUp() {
	inputTitle.value = profileTitle.textContent;
	inputSubTitle.value = profileSubTitle.textContent;
	popUp.classList.toggle('form-container_hide');
}

editProfileBtn.addEventListener('click', togglePopUp);
closeBtn.addEventListener('click', togglePopUp);

let form = document.querySelector('.form__content');
let saveBtn = document.querySelector('.form__close-button');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = inputTitle.value;
	profileSubTitle.textContent = inputSubTitle.value;
	togglePopUp();
}

form.addEventListener('submit', formSubmitHandler); 