// Переменные profile
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');

// Переменные popup profile
const popupProfile = document.querySelector('.popup__profile');
const popupContainerProfile = popupProfile.querySelector('.popup__container-profile');
const popupCloseEdit = popupProfile.querySelector('.popup__close-edit');
const newName = popupProfile.querySelector('.popup__input_name');
const newAboutMe = popupProfile.querySelector('.popup__input_about-me');

// Пременные template
const elementTemplate = document.querySelector('#element-template');

// Переменные popup card
const popupCard = document.querySelector('.popup__card');
const popupContainerCard = popupCard.querySelector('.popup__container-card');
const popupCloseCard = popupCard.querySelector('.popup__close-card');
const nameCard = popupCard.querySelector('.popup__input_name-card');
const linkCard = popupCard.querySelector('.popup__input_link-to-image');

// Переменные elements
const elements = document.querySelector('.elements');

// Переменные popup image
const popupImage = document.querySelector('.popup__images');
const popupCloseImage = popupImage.querySelector('.popup__close-image');
const popupPreview = popupImage.querySelector('.popup__preview');
const popupTitleImage = popupImage.querySelector('.popup__title-image');



// Начальный массив карточек
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

// Создать карточки
function createCards(name, link) {
    const elementCard = elementTemplate.content.cloneNode(true);

    elementCard.querySelector('.element__title').textContent = name;
    elementCard.querySelector('.element__image').src = link;
    elementCard.querySelector('.element__image').alt = name;

    elementCard.querySelector('.element__button-like').addEventListener('click', cardLike);
    elementCard.querySelector('.element__image').addEventListener('click', previewImage);
    elementCard.querySelector('.element__button-remove').addEventListener('click', removeCard);

    return elementCard;
};

// Добавить карточки из начального массива
initialCards.forEach(function (elem) {
    elements.append(createCards(elem.name, elem.link));
});

// Открыть или закрыть popup
function openClosePopup(elem) {
    elem.classList.toggle('popup_opened');
};

// Заполнить форму edit profile значениями со страницы
function popupOpenProfile() {
        newName.value = profileTitle.textContent;
        newAboutMe.value = profileSubtitle.textContent;
        openClosePopup(popupProfile);
};

// Изменить значения profile из формы popup
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = newName.value;
    profileSubtitle.textContent = newAboutMe.value;
    openClosePopup(popupProfile);
};

// Открыть пустую форму popup-card
function popupOpenCard() {
   nameCard.value = '';
   linkCard.value = '';
   openClosePopup(popupCard)
};

// Добавить новую карточку из формы
function formSubmitCard(evt) {
    evt.preventDefault();
    elements.prepend(createCards(nameCard.value, linkCard.value));
    openClosePopup(popupCard);
};

//  Увеличить картинку
function previewImage(evt) {
    const item = evt.target;
    const itemText = evt.target.closest('.element');
    popupPreview.src = item.src;
    popupPreview.alt = item.alt;
    popupTitleImage.textContent = itemText.textContent;
    openClosePopup(popupImage);
}

// Поставить лайк
function cardLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
};

// Удалить карточку
function removeCard(evt) {
    const elementCard = evt.target.closest('.element');
    elementCard.remove();
};

profileEditButton.addEventListener('click', popupOpenProfile);
popupCloseEdit.addEventListener('click', () => { openClosePopup(popupProfile)});
popupContainerProfile.addEventListener('submit', formSubmitHandler);
profileAddButton.addEventListener('click', popupOpenCard);
popupCloseCard.addEventListener('click', () => { openClosePopup(popupCard)});
popupContainerCard.addEventListener('submit', formSubmitCard);
popupCloseImage.addEventListener('click', () => { openClosePopup(popupImage)});