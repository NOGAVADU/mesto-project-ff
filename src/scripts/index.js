import '../pages/index.css'
import {renderCards} from "./components/cards";
import {setPopupListener, openPopup} from "./components/popups";
import {profileFormElement, cardFormElement, handleProfileFormSubmit, handleCardFormSubmit} from "./components/forms";

// Получение необходимых элементов и разметки
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

const editProfilePopupBtn = document.querySelector(".profile__edit-button");
const newCardPopupBtn = document.querySelector(".profile__add-button");

setPopupListener(editProfilePopup)
editProfilePopupBtn.addEventListener('click',() => openPopup(editProfilePopup))

setPopupListener(newCardPopup)
newCardPopupBtn.addEventListener('click', () => openPopup(newCardPopup))

profileFormElement.addEventListener('submit', handleProfileFormSubmit)
cardFormElement.addEventListener('submit', handleCardFormSubmit)

renderCards()