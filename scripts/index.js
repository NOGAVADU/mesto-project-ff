// Получение необходимых элементов и разметки
const cardsTemplate = document.querySelector("#card-template").content; //Разметка карточки
const cardsContainer = document.querySelector(".places__list");

// Функция отрисовки карточек
function renderCards() {
    cardsContainer.innerHTML = ""; //Очистка контейнера
    cardsContainer.append(
        ...initialCards.map((cardData) => createCard(cardData))
    ); //Подгрузка карточек из массива и добавление их в контейнер
}

// Функция создания карточки
function createCard(cardData) {
    // Получение необходимых элементов и разметки карточки
    const card = cardsTemplate.querySelector(".card").cloneNode(true);
    const deleteBtn = card.querySelector(".card__delete-button");
    // Наполнение элемента карточки контеном ( + Случайное изображение, чтобы не было пусто)
    card.querySelector(".card__title").textContent = cardData.name;
    card.querySelector(".card__image").src =
        "https://plus.unsplash.com/premium_photo-1679314213957-909df10381ac?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    // Обработчики событий для элемента карточки
    deleteBtn.addEventListener("click", () => removeCard(cardData));
    return card;
}
// Функция удаления карточки
function removeCard(cardData) {
    initialCards.forEach((card, i) => {
        if (card.name === cardData.name) initialCards.splice(i, 1);
    });
    renderCards();
}

renderCards();
