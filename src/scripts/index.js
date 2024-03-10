import '../pages/index.css'
import {renderCards} from "./components/cards";
import {createPopup} from "./components/popups";

// Получение необходимых элементов и разметки
const cardsTemplate = document.querySelector("#card-template").content; //Разметка карточки
const cardsContainer = document.querySelector(".places__list");
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

const editPopupBtn = document.querySelector(".profile__edit-button");
const newCardPopupBtn = document.querySelector(".profile__add-button");

createPopup(editPopup, editPopupBtn)
createPopup(newCardPopup, newCardPopupBtn)

renderCards(cardsContainer, cardsTemplate)