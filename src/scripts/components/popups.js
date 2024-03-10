function openPopup(popup) {
    popup.classList.add('popup_is-opened')
    document.addEventListener('keydown', (e) => keyHandler(e, popup))
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened')
    document.removeEventListener('keydown', (e) => keyHandler(e, popup))
}

function keyHandler(e, popup) {
    if (e.key === 'Escape') {
        closePopup(popup)
    }
}

function setPopupListener(popup, openBtn) {
    const closeBtn = popup.querySelector('.popup__close')
    // Добавление прослушивания событий
    openBtn.addEventListener('click', () => openPopup(popup))
    // openBtn.addEventListener('click', () => openPopup(popup))
    closeBtn.addEventListener('click', () => closePopup(popup))
    // Обработка клика по Overlay
    popup.addEventListener('click', (e) => {
        if (e.currentTarget === e.target) {
            closePopup(popup)
        }
    })
}


export {setPopupListener, openPopup, closePopup}