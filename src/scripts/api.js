const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
    headers: {
        authorization: 'a0a3323a-7973-4bd7-9777-bf33bd2615b8',
        'Content-Type': 'application/json'
    }
}

const handleResponse = (res) => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`);
}

// API для карточек=====================================================================================================
export const getInitialCards = fetch(config.baseUrl + '/cards', {
    method: 'GET',
    headers: config.headers
}).then(handleResponse)

export const createCard = (name, link) => {
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        })
    }).then(handleResponse)
}

export const likeCard = (cardId) => {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(handleResponse)
}

export const removeCardLike = (cardId) => {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(handleResponse)
}

export const deleteCard = (cardId) => {
    return fetch(config.baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(handleResponse)
}
// API для профиля======================================================================================================
export const getUser = fetch(config.baseUrl + '/users/me', {
    method: 'GET',
    headers: config.headers
}).then(handleResponse)

export const updateUser = (name, description) => {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description,
        })
    }).then(handleResponse)
}
export const updateUserAvatar = (imageUrl) => {
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: imageUrl,
        })
    }).then(handleResponse)
}
