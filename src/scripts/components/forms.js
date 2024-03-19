import {closePopup} from "./popups";
import {cardsContainer, createCardElement} from "./cards";
import {enableValidation} from "../validation";
import {createCard, deleteCard, getUser, updateUser, updateUserAvatar} from "../api";
import {setUserData} from "./profile";
// Объявление констант для popup редактирования профиля
export const profileFormElement = document.forms['edit-profile'];
const profileNameInput = profileFormElement.elements.name;
const profileJobInput = profileFormElement.elements.description;
const profileSubmitBtn = profileFormElement.elements.button
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profilePopup = document.querySelector(".popup_type_edit")
// Объявление констант для popup создания карточки
export const cardFormElement = document.forms['new-place']
const cardNameInput = cardFormElement.elements['place-name']
const cardLinkInput = cardFormElement.elements.link
const cardSubmitBtn = cardFormElement.elements.button
const cardPopup = document.querySelector(".popup_type_new-card")
// Объявляение констант для popup обновления аватарки профиля
export const avatarFormElement = document.forms['profile-avatar']
const avatarLinkInput = avatarFormElement.elements.link
const avatarSubmitBtn = avatarFormElement.elements.button
const avatarPopup = document.querySelector(".popup_type_avatar")
const profileImg = document.querySelector('.profile__image')
// Объявление констант для popup удаления карточки
export const deleteCardFormElement = document.forms['delete-place']
const deleteCardSubmitBtn = deleteCardFormElement.elements.button
const deleteCardPopup = document.querySelector('.popup_type_delete-card')

const userId = getUser.then(user => user._id)
// Включение валидации для форм
enableValidation([profileFormElement, cardFormElement])

export function fillProfileInputs() {
    profileNameInput.value = profileName.textContent
    profileJobInput.value = profileJob.textContent
}

export function handleDeleteCardSubmit(e, cardId, card) {
    e.preventDefault()
    deleteCardSubmitBtn.textContent = 'Удаление...'

    deleteCard(cardId)
        .then(() => card.remove())
        .finally(() => {
            closePopup(deleteCardPopup)
            deleteCardPopup.dataset.choosenCard = ''
            deleteCardSubmitBtn.textContent = 'Удалить'
        })
}

export function handleAvatarFormSubmit(e) {
    e.preventDefault()
    avatarSubmitBtn.textContent = 'Сохранение...'

    updateUserAvatar(avatarLinkInput.value)
        .then(user =>
            profileImg.style.backgroundImage = `url("${user.avatar}")`
        )
        .finally(() => {
            closePopup(avatarPopup)
            avatarSubmitBtn.textContent = 'Сохранить'
        })
}

export function handleProfileFormSubmit(e) {
    e.preventDefault()
    profileSubmitBtn.textContent = 'Сохранение...'

    updateUser(profileNameInput.value, profileJobInput.value)
        .then(user => setUserData(user))
        .finally(() => {
            closePopup(profilePopup)
            profileSubmitBtn.textContent = 'Сохранить'
        })
}

export function handleCardFormSubmit(e) {
    e.preventDefault()
    cardSubmitBtn.textContent = 'Сохранение...'

    Promise.all([createCard(cardNameInput.value, cardLinkInput.value), userId]).then(data => {
        const newCard = createCardElement(data[0], data[1])
        cardsContainer.prepend(newCard)
    }).finally(() => {
        closePopup(cardPopup)
        cardSubmitBtn.textContent = 'Сохранить'
    })

    cardFormElement.reset()
}
