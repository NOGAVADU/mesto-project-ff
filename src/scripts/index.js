import '../pages/index.css'
import {cardHandlers, cardToDelete, cardToDeleteId, renderCards} from "./components/cards";
import {setPopupListener, openPopup} from "./components/popups";
import {
    profileFormElement,
    cardFormElement,
    handleProfileFormSubmit,
    fillProfileInputs,
    handleCardFormSubmit, avatarFormElement, handleAvatarFormSubmit, deleteCardFormElement, handleDeleteCardSubmit
} from "./components/forms";
import {clearValidation, enableValidation} from "./validation";
import {getInitialCards, getUser} from "./api";
import {setUserData} from "./components/profile";
import {config} from "./validationConfig";

// Получение необходимых элементов и разметки
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const cardImagePopup = document.querySelector(".popup_type_image");
const deleteCardPopup = document.querySelector('.popup_type_delete-card')
const avatarPopup = document.querySelector(".popup_type_avatar")

const editProfilePopupBtn = document.querySelector(".profile__edit-button");
const newCardPopupBtn = document.querySelector(".profile__add-button");
const avatarPopupBtn = document.querySelector(".profile__image__edit-button")

setPopupListener(editProfilePopup)
setPopupListener(newCardPopup)
setPopupListener(cardImagePopup)
setPopupListener(deleteCardPopup)
setPopupListener(avatarPopup)
editProfilePopupBtn.addEventListener('click', () => {
    fillProfileInputs()
    clearValidation(profileFormElement, config)
    openPopup(editProfilePopup)
})
newCardPopupBtn.addEventListener('click', () => {
    clearValidation(cardFormElement, config)
    openPopup(newCardPopup)
})

avatarPopupBtn.addEventListener('click', () => {
    clearValidation(avatarFormElement, config)
    openPopup(avatarPopup)
})

enableValidation(config)
avatarFormElement.addEventListener('submit', handleAvatarFormSubmit)
profileFormElement.addEventListener('submit', handleProfileFormSubmit)
cardFormElement.addEventListener('submit', handleCardFormSubmit)
deleteCardFormElement.addEventListener('submit', (evt) => handleDeleteCardSubmit(evt, cardToDeleteId, cardToDelete))

Promise.all([getUser, getInitialCards]).then(data => {
    const [user, cards] = data;
    setUserData(user)
    cardHandlers.setCardsLikes(cards, user)
    renderCards(cards, user._id)
})