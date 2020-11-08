const popUps = document.querySelectorAll('.dialog');
let editProfilePopUp;
let addCardPopUp;
for (let index = 0; index < popUps.length; index++) {
	if (popUps[index].querySelector('.dialog__content').name==='editProfileForm') {
		editProfilePopUp = popUps[index];
	}
	if (popUps[index].querySelector('.dialog__content').name==='addCardForm') {
		addCardPopUp = popUps[index];
	}
}

const addCardBtn = document.querySelector('.profile-container__add-button');
const editProfileBtn = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');


const editProfileCloseBtn = editProfilePopUp.querySelector('.dialog__close-button');
const editProfileForm = document.forms.editProfileForm;
const editProfileInputTitle = editProfileForm.elements.inputName;
const editProfileInputSubTitle = editProfileForm.elements.inputAbout;


const addCardCloseBtn = addCardPopUp.querySelector('.dialog__close-button');
const addCardForm = document.forms.addCardForm;
const addCardInputTitle = addCardForm.elements.inputName;
const addCardInputSubTitle = addCardForm.elements.inputAbout;

const cardZoomPopUp = document.querySelector('.card-dialog');
const cardZoomCloseBtn = cardZoomPopUp.querySelector('.card-dialog__close-button');
const cardZoomImg = cardZoomPopUp.querySelector('.card-dialog__img');
const cardZoomLabel = cardZoomPopUp.querySelector('.card-dialog__label');

const cardTemplate = document.querySelector('#card').content;
const gallery = document.querySelector('.gallery');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

for (let index = 0; index < initialCards.length; index++) {
	addCard(initialCards[index].name,initialCards[index].link);
}

function addCard(name,link) {
	const cardElement = cardTemplate.cloneNode(true);
	cardElement.querySelector('.gallery__img').src = link;
	cardElement.querySelector('.gallery__img').addEventListener('click', function(event) {
		cardZoomImg.src = link;
		cardZoomLabel.textContent = name;
		toggleCardZoomPopUp();
	});
	cardElement.querySelector('.gallery__trash').addEventListener('click', function(event) {
		const card = event.target.closest('.gallery__item');
  	card.remove();
	});
	cardElement.querySelector('.gallery__title').textContent = name;
	cardElement.querySelector('.gallery__like').addEventListener('click', function(event) {
		event.target.classList.toggle('gallery__like_active');
	});
	gallery.prepend(cardElement); 
}

function toggleUserEditPopUp() {
	if (!editProfilePopUp.classList.contains('dialog_show')) {
		editProfileInputTitle.value = profileTitle.textContent;
	  editProfileInputSubTitle.value = profileSubTitle.textContent;
	}
	
	editProfilePopUp.classList.toggle('dialog_show');
}

function toggleAddCardPopUp() {
	addCardPopUp.classList.toggle('dialog_show');
}

function formSubmitHandler (evt) {
	evt.preventDefault();

	switch (evt.target.name) {
		case "editProfileForm":
			profileTitle.textContent = editProfileInputTitle.value;
			profileSubTitle.textContent = editProfileInputSubTitle.value;
			toggleUserEditPopUp();
			break;
		case "addCardForm":
			addCard(addCardInputTitle.value,addCardInputSubTitle.value);
			toggleAddCardPopUp();
			addCardInputTitle.value='';
			addCardInputSubTitle.value='';
			break;
		default:
			break;
	}
}

function toggleCardZoomPopUp() {
	cardZoomPopUp.classList.toggle('card-dialog_show');
}

editProfileBtn.addEventListener('click', toggleUserEditPopUp);
editProfileCloseBtn.addEventListener('click', toggleUserEditPopUp);
editProfileForm.addEventListener('submit', formSubmitHandler);

addCardBtn.addEventListener('click', toggleAddCardPopUp);
addCardCloseBtn.addEventListener('click', toggleAddCardPopUp);
addCardForm.addEventListener('submit', formSubmitHandler);

cardZoomCloseBtn.addEventListener('click', toggleCardZoomPopUp);