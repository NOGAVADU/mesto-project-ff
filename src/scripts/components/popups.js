
function openPopup(popup) {
    popup.classList.add('popup_is-opened')
    document.addEventListener('keydown', handleEscape)
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', handleEscape)
}

function handleEscape (e) {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened')
        closePopup(openedPopup)
    }
}
function setPopupListener(popup) {
    const closeBtn = popup.querySelector('.popup__close')
    // Добавление прослушивания событий
    closeBtn.addEventListener('click', () => closePopup(popup))
    // Обработка клика по Overlay
    popup.addEventListener('mousedown', (e) => {
        if (e.currentTarget === e.target) {
            closePopup(popup)
        }
    })
}


export {setPopupListener, openPopup, closePopup}