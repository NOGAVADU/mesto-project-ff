import {setPopupListener, openPopup} from "./popups";
import {addLikeCard, deleteCard, deleteLikeCard, getUser, likeCard, removeCardLike} from "../api";
import {deleteCardFormElement, handleDeleteCardSubmit} from "./forms";

const cardsContainer = document.querySelector(".places__list");
const cardsTemplate = document.querySelector("#card-template").content; //Разметка карточки
const cardPopup = document.querySelector(".popup_type_image");
const popupImg = cardPopup.querySelector('.popup__image')
const popupCaption = cardPopup.querySelector('.popup__caption')
const deleteCardPopup = document.querySelector('.popup_type_delete-card')

export let cardToDelete, cardToDeleteId;

// Объявление функций для управления карточкой
const cardHandlers = {
    removeCard: function (cardId, card) {
        cardToDeleteId = cardId;
        cardToDelete = card;
        openPopup(deleteCardPopup)
    },
    setCardsLikes: function (cardList, user) {
        // Добавление свойства liked, понравившимся пользователю карточек
        for (let i = 0; i < cardList.length; i++){
            cardList[i].liked = cardList[i].likes.some(like => like._id === user._id);
        }
    },
    likeCard: function (likeBtn, card, likeAmount) {
        const likeMethod = card.liked ? deleteLikeCard : addLikeCard;
        likeMethod(card._id).then(res => {
            card.liked = !card.liked;
            likeAmount.textContent = res.likes.length;
            likeBtn.classList.toggle('card__like-button_is-active')
        }).catch(err => {
            console.log(err)
        })
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
    if (userId && cardData.owner._id !== userId) {
        deleteBtn.style.display = 'none'
    } else {
        deleteBtn.addEventListener("click", () => cardHandlers.removeCard(cardData._id, card));
    }

    return card;
}

export {cardsContainer, cardHandlers, createCardElement, renderCards}