const addCardBtn = document.querySelector('.profile-container__add-button');
const editProfileBtn = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');

const editProfilePopUp = document.querySelector('.dialog__edit-profile');
const editProfileCloseBtn = editProfilePopUp.querySelector('.dialog__close-button');
const editProfileForm = document.forms.editProfileForm;
const editProfileInputTitle = editProfileForm.elements.inputName;
const editProfileInputSubTitle = editProfileForm.elements.inputAbout;

const addCardPopUp = document.querySelector('.dialog__add-card');
const addCardCloseBtn = addCardPopUp.querySelector('.dialog__close-button');
const addCardForm = document.forms.addCardForm;
const addCardInputTitle = addCardForm.elements.inputName;
const addCardInputSubTitle = addCardForm.elements.inputAbout;

const cardZoomPopUp = document.querySelector('.dialog__detail-card');
const cardZoomCloseBtn = cardZoomPopUp.querySelector('.dialog__close-button_card');
const cardZoomImg = cardZoomPopUp.querySelector('.dialog__img_card');
const cardZoomLabel = cardZoomPopUp.querySelector('.dialog__title_card');

const cardTemplate = document.querySelector('#card').content;
const gallery = document.querySelector('.gallery');

//Заполнение галереи карточками
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
	gallery.append(addCard(initialCards[index].name,initialCards[index].link));
}

function addCard(name,link) {
	const cardElement = cardTemplate.cloneNode(true);
	const cardImg = cardElement.querySelector('.gallery__img');
	const cardTrash = cardElement.querySelector('.gallery__trash');
	const cardTitle = cardElement.querySelector('.gallery__title');
	const cardLike = cardElement.querySelector('.gallery__like');

	cardImg.src = link;
	cardImg.addEventListener('click', function() {
		cardZoomImg.src = link;
		cardZoomLabel.textContent = name;
		toggleCardZoomPopUp();
	});

	cardTrash.addEventListener('click', function(event) {
		const card = event.target.closest('.gallery__item');
  	card.remove();
	});

	cardTitle.textContent = name;

	cardLike.addEventListener('click', function(event) {
		event.target.classList.toggle('gallery__like_active');
	});
	
	return cardElement; 
}
//Заполнение галереи карточками

//клик по кнопке редактирования профиля
function toggleUserEditPopUp() {
	if (!editProfilePopUp.classList.contains('dialog_show')) {
		editProfileInputTitle.value = profileTitle.textContent;
	  editProfileInputSubTitle.value = profileSubTitle.textContent;
	}
	
	//это решение было заявлено как обязательное другим ревьювером. две функции уже были до этого
	editProfilePopUp.classList.toggle('dialog_show');
}
//клик по кнопке редактирования профиля

//клик по кнопке добавления новой карточки
function toggleAddCardPopUp() {
	addCardPopUp.classList.toggle('dialog_show');
}
//клик по кнопке добавления новой карточки

//клик по карточке
function toggleCardZoomPopUp() {
	cardZoomPopUp.classList.toggle('dialog_show');
}
//клик по карточке

//обработчик форм
function formSubmitHandler (evt) {
	evt.preventDefault();

	switch (evt.target.name) {
		case "editProfileForm":
			profileTitle.textContent = editProfileInputTitle.value;
			profileSubTitle.textContent = editProfileInputSubTitle.value;
			toggleUserEditPopUp();
			break;
		case "addCardForm":
			gallery.prepend(addCard(addCardInputTitle.value,addCardInputSubTitle.value));
			toggleAddCardPopUp();
			addCardInputTitle.value='';
			addCardInputSubTitle.value='';
			break;
		default:
			break;
	}
}
//обработчик форм

editProfileBtn.addEventListener('click', toggleUserEditPopUp);
editProfileCloseBtn.addEventListener('click', toggleUserEditPopUp);
editProfileForm.addEventListener('submit', formSubmitHandler);

addCardBtn.addEventListener('click', toggleAddCardPopUp);
addCardCloseBtn.addEventListener('click', toggleAddCardPopUp);
addCardForm.addEventListener('submit', formSubmitHandler);

cardZoomCloseBtn.addEventListener('click', toggleCardZoomPopUp);