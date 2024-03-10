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
const cardHandler = {
    removeCard: function (card) {
        card.remove()
    },
};

// Функция отрисовки карточек
function renderCards(cardsContainer, cardTemplate) {
    cardsContainer.innerHTML = ""; //Очистка контейнера
    cardsContainer.append(
        ...initialCards.map((cardData) => createCard(cardData, cardTemplate, cardHandler))
    ); //Подгрузка карточек из массива и добавление их в контейнер
}

// Функция создания карточки
function createCard(cardData, cardTemplate, { removeCard }) {
    // Получение необходимых элементов и разметки карточки
    const card = cardTemplate.querySelector(".card").cloneNode(true);
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

export {createCard, cardHandler, renderCards}