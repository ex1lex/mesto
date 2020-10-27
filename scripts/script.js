
let editProfileBtn = document.querySelector('.profile__edit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');

let closeBtn = document.querySelector('.dialog__close-button');
let popUp = document.querySelector('.dialog');
let form = document.forms.editProfileForm;
let inputTitle = form.elements.inputName;
let inputSubTitle = form.elements.inputAbout;

function togglePopUp() {
	if (!popUp.classList.contains('dialog_show')) {
		inputTitle.value = profileTitle.textContent;
	  inputSubTitle.value = profileSubTitle.textContent;
	}
	popUp.classList.toggle('dialog_show');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = inputTitle.value;
	profileSubTitle.textContent = inputSubTitle.value;
	togglePopUp();
}

editProfileBtn.addEventListener('click', togglePopUp);
closeBtn.addEventListener('click', togglePopUp);
form.addEventListener('submit', formSubmitHandler); 