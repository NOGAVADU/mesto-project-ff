import '../pages/index.css'
import {cardHandlers, renderCards} from "./components/cards";
import {setPopupListener, openPopup} from "./components/popups";
import {
    profileFormElement,
    cardFormElement,
    handleProfileFormSubmit,
    fillProfileInputs,
    handleCardFormSubmit, avatarFormElement, handleAvatarFormSubmit, deleteCardFormElement, handleDeleteCardSubmit
} from "./components/forms";
import {validationPopupOpener} from "./validation";
import {getInitialCards, getUser} from "./api";
import {setUserData} from "./components/profile";

// Получение необходимых элементов и разметки
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const deleteCardPopup = document.querySelector('.popup_type_delete-card')
const avatarPopup = document.querySelector(".popup_type_avatar")

const editProfilePopupBtn = document.querySelector(".profile__edit-button");
const newCardPopupBtn = document.querySelector(".profile__add-button");
const avatarPopupBtn = document.querySelector(".profile__image__edit-button")

setPopupListener(editProfilePopup)
setPopupListener(newCardPopup)
setPopupListener(deleteCardPopup)
setPopupListener(avatarPopup)
editProfilePopupBtn.addEventListener('click', () => {
    fillProfileInputs()
    validationPopupOpener(profileFormElement)
    openPopup(editProfilePopup)
})
newCardPopupBtn.addEventListener('click', () => {
    validationPopupOpener(cardFormElement)
    openPopup(newCardPopup)
})

avatarPopupBtn.addEventListener('click', () => {
    openPopup(avatarPopup)
})

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit)
profileFormElement.addEventListener('submit', handleProfileFormSubmit)
cardFormElement.addEventListener('submit', handleCardFormSubmit)

Promise.all([getUser, getInitialCards]).then(data => {
    const user = data[0]
    const cards = data[1]
    setUserData(user)
    cardHandlers.setCardsLikes(cards, user)
    renderCards(cards, user._id)
})