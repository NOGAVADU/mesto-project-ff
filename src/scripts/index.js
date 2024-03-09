import '../pages/index.css'
import initialCards from './cards'

// Получение необходимых элементов и разметки
const cardsTemplate = document.querySelector("#card-template").content; //Разметка карточки
const cardsContainer = document.querySelector(".places__list");

// Объявление функций для управления карточкой
const cardHandler = {
    // Функция удаления карточки
    removeCard: function (card) {
        card.remove()
    },
};

// Функция отрисовки карточек
function renderCards() {
    cardsContainer.innerHTML = ""; //Очистка контейнера
    cardsContainer.append(
        ...initialCards.map((cardData) => createCard(cardData, cardHandler))
    ); //Подгрузка карточек из массива и добавление их в контейнер
}

// Функция создания карточки
function createCard(cardData, { removeCard }) {
    // Получение необходимых элементов и разметки карточки
    const card = cardsTemplate.querySelector(".card").cloneNode(true);
    const deleteBtn = card.querySelector(".card__delete-button");
    const cardTitle = card.querySelector(".card__title");
    const cardImg = card.querySelector(".card__image");
    // Наполнение элемента карточки контеном
    cardTitle.textContent = cardData.name;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name + ' красивое фото в цвете';
    // Обработчики событий для элемента карточки
    deleteBtn.addEventListener("click", () => removeCard(card));
    return card;
}

renderCards();
