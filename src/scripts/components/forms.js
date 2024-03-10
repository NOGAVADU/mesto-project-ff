import {closePopup} from "./popups";
import {createCard, cardsContainer} from "./cards";
// Объявление констант для popup редактирования профиля
const profileFormElement = document.forms['edit-profile'];
const profileNameInput = profileFormElement.elements.name;
const profileJobInput = profileFormElement.elements.description
// Объявление констант для popup создания карточки
const cardFormElement = document.forms['new-place']
const cardNameInput = cardFormElement.elements['place-name']
const cardLinkInput = cardFormElement.elements.link


function handleProfileFormSubmit (e) {
    e.preventDefault()
    const profileName = document.querySelector(".profile__title")
    const profileJob = document.querySelector(".profile__description")

    profileName.textContent = profileNameInput.value
    profileJob.textContent = profileJobInput.value

    profileFormElement.reset()
    closePopup(document.querySelector(".popup_type_edit"))
}

function handleCardFormSubmit (e) {
    e.preventDefault()
    const newCard = createCard({name: cardNameInput.value, link: cardLinkInput.value})

    cardsContainer.prepend(newCard)

    cardFormElement.reset()
    closePopup(document.querySelector(".popup_type_new-card"))
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit)
cardFormElement.addEventListener('submit', handleCardFormSubmit)

export {profileFormElement, cardFormElement}