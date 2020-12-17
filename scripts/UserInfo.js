export class UserInfo {
  constructor({ selectorName, selectorAbout }) {
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
    this._values = {};
  }

  getUserInfo() {
    this._values["name"] = this._name.textContent;
    this._values["about"] = this._about.textContent;
    return this._values;
  }

  setUserInfo({ inputName, inputAbout }) {
    document.querySelector(".profile__title").textContent = inputName;
    document.querySelector(".profile__subtitle").textContent = inputAbout;
  }
}
