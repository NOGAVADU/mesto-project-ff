import '../pages/index.css'
import {renderCards} from "./components/cards";
import {createPopup} from "./components/popups";
import {profileFormElement, cardFormElement} from "./components/forms";

// Получение необходимых элементов и разметки
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

const editPopupBtn = document.querySelector(".profile__edit-button");
const newCardPopupBtn = document.querySelector(".profile__add-button");

createPopup(editProfilePopup, editPopupBtn)
createPopup(newCardPopup, newCardPopupBtn)

renderCards()