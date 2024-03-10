import {setPopupListener, openPopup} from "./popups";

const cardsContainer = document.querySelector(".places__list");
const cardsTemplate = document.querySelector("#card-template").content; //Разметка карточки
const cardPopup = document.querySelector(".popup_type_image");
const popupImg = cardPopup.querySelector('.popup__image')
const popupCaption = cardPopup.querySelector('.popup__caption')
let wasOpened = false
const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

// Объявление функций для управления карточкой
const cardHandlers = {
    removeCard: function (card) {
        card.remove()
    },
    likeCard: function (likeBtn) {
            likeBtn.classList.toggle('card__like-button_is-active')
    },
    openCardPopup: function (cardTitle, cardImg) {
        openPopup(cardPopup)
        popupImg.src = cardImg.src
        popupImg.alt = cardImg.alt
        popupCaption.textContent = cardTitle.textContent
    }
};

// Функция отрисовки карточек
function renderCards() {
    cardsContainer.innerHTML = ""; //Очистка контейнера
    cardsContainer.append(
        ...initialCards.map((cardData) => createCard(cardData, cardHandlers))
    ); //Подгрузка карточек из массива и добавление их в контейнер
}

// Функция создания карточки
function createCard(cardData, cardHandlers) {
    // Получение необходимых элементов и разметки карточки
    const card = cardsTemplate.querySelector(".card").cloneNode(true);
    const likeBtn = card.querySelector('.card__like-button')
    const deleteBtn = card.querySelector(".card__delete-button");
    const cardTitle = card.querySelector(".card__title");
    const cardImg = card.querySelector(".card__image");
    // Наполнение элемента карточки контеном
    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name + ' красивое фото в цвете';
    // Обработчики событий для элемента карточки
    deleteBtn.addEventListener("click", () => cardHandlers.removeCard(card));
    likeBtn.addEventListener('click', () => cardHandlers.likeCard(likeBtn))
    cardImg.addEventListener('click', () => cardHandlers.openCardPopup(cardTitle, cardImg))
    return card;
}

setPopupListener(cardPopup)

export {cardsContainer, cardHandlers, createCard, renderCards}