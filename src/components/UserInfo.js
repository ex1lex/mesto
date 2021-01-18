export class UserInfo {
  constructor({ selectorName, selectorAbout, selectorAvatar }) {
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    this._values = {};
    this._values["inputName"] = this._name.textContent;
    this._values["inputAbout"] = this._about.textContent;
    return this._values;
  }

  setUserInfo(inputName, inputAbout) {
    this._name.textContent = inputName;
    this._about.textContent = inputAbout;
  }

  setUserAvatar(url) {
    this._avatar.src = url;
  }

  getUserAvatar() {
    this._values = {};
    this._values["inputAbout"] = this._avatar.textContent;
    return this._values;
  }
}
