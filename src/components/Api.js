export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
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
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          });
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    deleteCard(elemId) {
        return fetch(`${this._baseUrl}/cards/${elemId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    addLike(elemId) {
        return fetch(`${this._baseUrl}/cards/likes/${elemId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    deleteLike(elemId) {
        return fetch(`${this._baseUrl}/cards/likes/${elemId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
    updateAvatar(newAvatar){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              avatar: newAvatar
            })
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
              return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}