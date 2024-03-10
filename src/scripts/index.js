import '../pages/index.css'
import {renderCards} from "./components/cards";

// Получение необходимых элементов и разметки
const cardsTemplate = document.querySelector("#card-template").content; //Разметка карточки
const cardsContainer = document.querySelector(".places__list");


renderCards(cardsContainer, cardsTemplate)