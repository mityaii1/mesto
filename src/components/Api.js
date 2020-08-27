export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _getResponseData(res){
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._getResponseData)
    }
    setUserInfo(fullName, aboutMe) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: fullName,
                about: aboutMe
            })
        })
        .then(this._getResponseData)
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._getResponseData)
    }
    addNewCard(nameCard, linkToImage) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: nameCard, 
                link: linkToImage
            })
        })
        .then(this._getResponseData)
    }
    deleteCard(elemId) {
        return fetch(`${this._baseUrl}/cards/${elemId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._getResponseData)
    }
    addLike(elemId) {
        return fetch(`${this._baseUrl}/cards/likes/${elemId}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._getResponseData)
    }
    deleteLike(elemId) {
        return fetch(`${this._baseUrl}/cards/likes/${elemId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._getResponseData)
    }
    updateAvatar(newAvatar){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              avatar: newAvatar
            })
          })
          .then(this._getResponseData)
    }
}