const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
    headers: {
        authorization: 'a0a3323a-7973-4bd7-9777-bf33bd2615b8',
        'Content-Type': 'application/json'
    }
}
// API для карточек=====================================================================================================
export const getInitialCards = fetch(config.baseUrl + '/cards', {
    method: 'GET',
    headers: config.headers
}).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`);
}).catch(err => console.log(err))

export const createCard = (name, link) => {
    return fetch(config.baseUrl + '/cards', {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        })
    }).then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => console.log(err))
}

export const likeCard = (cardId) => {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => console.log(err))
}

export const removeCardLike = (cardId) => {
    return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => console.log(err))
}

export const deleteCard = (cardId) => {
    return fetch(config.baseUrl + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => console.log(err))
}
// API для профиля======================================================================================================
export const getUser = fetch(config.baseUrl + '/users/me', {
    method: 'GET',
    headers: config.headers
}).then(res => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`);
}).catch(err => console.log(err))

export const updateUser = (name, description) => {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description,
        })
    }).then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => console.log(err))
}
export const updateUserAvatar = (imageUrl) => {
    return fetch(config.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: imageUrl,
        })
    }).then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
    }).catch(err => console.log(err))
}
