import '../pages/index.css'
import {renderCards} from "./components/cards";
import {setPopupListener, openPopup} from "./components/popups";
import {profileFormElement, cardFormElement, handleProfileFormSubmit, fillProfileInputs, handleCardFormSubmit} from "./components/forms";
import {validationPopupOpener} from "./validation";

// Получение необходимых элементов и разметки
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

const editProfilePopupBtn = document.querySelector(".profile__edit-button");
const newCardPopupBtn = document.querySelector(".profile__add-button");

setPopupListener(editProfilePopup)
setPopupListener(newCardPopup)
editProfilePopupBtn.addEventListener('click',() => {
    fillProfileInputs()
    validationPopupOpener(profileFormElement)
    openPopup(editProfilePopup)
})
newCardPopupBtn.addEventListener('click', () => {
    validationPopupOpener(cardFormElement)
    openPopup(newCardPopup)
})

profileFormElement.addEventListener('submit', handleProfileFormSubmit)
cardFormElement.addEventListener('submit', handleCardFormSubmit)

renderCards()