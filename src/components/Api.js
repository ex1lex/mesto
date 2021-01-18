export class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _catch(error) {
    console.log(error);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleResponse)
      .catch(this._catch);
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleResponse)
      .catch(this._catch);
  }

  setUserAvatar(url) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: url,
      }),
    })
      .then(this._handleResponse)
      .catch(this._catch);
  }

  setUserInfo({ inputName, inputAbout }) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputName,
        about: inputAbout,
      }),
    })
      .then(this._handleResponse)
      .catch(this._catch);
  }

  addNewCard(name, link) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then(this._handleResponse)
      .catch(this._catch);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleResponse)
      .catch(this._catch);
  }

  setLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleResponse)
      .catch(this._catch);
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    })
      .then(this._handleResponse)
      .catch(this._catch);
  }
}
