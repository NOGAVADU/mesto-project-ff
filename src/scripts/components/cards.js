import {setPopupListener, openPopup} from "./popups";
import {deleteCard, getUser, likeCard, removeCardLike} from "../api";
import {deleteCardFormElement, handleDeleteCardSubmit} from "./forms";

const cardsContainer = document.querySelector(".places__list");
const cardsTemplate = document.querySelector("#card-template").content; //Разметка карточки
const cardPopup = document.querySelector(".popup_type_image");
const popupImg = cardPopup.querySelector('.popup__image')
const popupCaption = cardPopup.querySelector('.popup__caption')
const deleteCardPopup = document.querySelector('.popup_type_delete-card')
// Объявление функций для управления карточкой
const cardHandlers = {
    removeCard: function (cardId, card) {
        deleteCardFormElement.addEventListener('submit', e => handleDeleteCardSubmit(e, cardId, card))
        openPopup(deleteCardPopup)
    },
    setCardsLikes: function (cardList, user) {
        for (let i = 0; i < cardList.length; i++) {
            for (let j = 0; j < cardList[i].likes.length; j++) {
                if (cardList[i].likes[j]._id === user._id) {
                    cardList[i].liked = true;
                }
            }
        }
    },
    likeCard: function (likeBtn, card, likeAmount) {
        if (card.liked) {
            removeCardLike(card._id).then(() => {
                card.liked = false;
                likeAmount.textContent = card.likes.length - 1
                likeBtn.classList.remove('card__like-button_is-active')
            })
        } else {
            likeCard(card._id).then(() => {
                card.liked = true;
                likeAmount.textContent = card.likes.length + 1
                likeBtn.classList.add('card__like-button_is-active')
            })
        }
    },
    openCardPopup: function (cardTitle, cardImg) {
        openPopup(cardPopup)
        popupImg.src = cardImg.src
        popupImg.alt = cardImg.alt
        popupCaption.textContent = cardTitle.textContent
    }
};

// Функция отрисовки карточек
function renderCards(cardsList, userId) {
    cardsContainer.innerHTML = ""; //Очистка контейнера
    cardsContainer.append(
        ...cardsList.map((cardData) => createCardElement(cardData, userId, cardHandlers))
    ); //Подгрузка карточек из массива и добавление их в контейнер
}

// Функция создания карточки
function createCardElement(cardData, userId, cardHandlers) {
    // Получение необходимых элементов и разметки карточки
    const card = cardsTemplate.querySelector(".card").cloneNode(true);
    const likeAmount = card.querySelector('.card__like-amount')
    const likeBtn = card.querySelector('.card__like-button')
    if (cardData.liked) {
        likeBtn.classList.add('card__like-button_is-active')
    }
    const deleteBtn = card.querySelector(".card__delete-button");
    const cardTitle = card.querySelector(".card__title");
    const cardImg = card.querySelector(".card__image");
    // Наполнение элемента карточки контеном
    cardTitle.textContent = cardData.name;
    likeAmount.textContent = cardData.likes.length
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name + ' красивое фото в цвете';
    // Обработчики событий для элемента карточки
    likeBtn.addEventListener('click', () => cardHandlers.likeCard(likeBtn, cardData, likeAmount))
    cardImg.addEventListener('click', () => cardHandlers.openCardPopup(cardTitle, cardImg))
    deleteBtn.addEventListener("click", () => cardHandlers.removeCard(cardData._id, card));
    if (userId && cardData.owner._id !== userId) {
        deleteBtn.style.display = 'none'
    }

    return card;
}

setPopupListener(cardPopup)

export {cardsContainer, cardHandlers, createCardElement, renderCards}