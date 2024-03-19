const profileBlock = document.querySelector('.profile')
const profileImg = profileBlock.querySelector('.profile__image')
const profileName = profileBlock.querySelector('.profile__title')
const profileDescription = profileBlock.querySelector('.profile__description')

export function setUserData (user) {
        profileName.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImg.style.backgroundImage = `url("${user.avatar}")`
}