import {closePopup} from "./popups";
import {createCard, cardsContainer, cardHandlers} from "./cards";
// Объявление констант для popup редактирования профиля
const profileFormElement = document.forms['edit-profile'];
const profileNameInput = profileFormElement.elements.name;
const profileJobInput = profileFormElement.elements.description;
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
// Начальные значения инпутов
profileNameInput.value = profileName.textContent
profileJobInput.value = profileJob.textContent
const profilePopup = document.querySelector(".popup_type_edit")
// Объявление констант для popup создания карточки
const cardFormElement = document.forms['new-place']
const cardNameInput = cardFormElement.elements['place-name']
const cardLinkInput = cardFormElement.elements.link
const newCard = createCard({name: cardNameInput.value, link: cardLinkInput.value}, cardHandlers)
const cardPopup = document.querySelector(".popup_type_new-card")

function handleProfileFormSubmit (e) {
    e.preventDefault()

    profileName.textContent = profileNameInput.value
    profileJob.textContent = profileJobInput.value

    closePopup(profilePopup)
}

function handleCardFormSubmit (e) {
    e.preventDefault()

    cardsContainer.prepend(newCard)

    cardFormElement.reset()
    closePopup(cardPopup)
}

export {profileFormElement, cardFormElement, handleProfileFormSubmit, handleCardFormSubmit}