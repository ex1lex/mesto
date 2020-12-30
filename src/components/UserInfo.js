export class UserInfo {
  constructor({ selectorName, selectorAbout }) {
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
    this._values = {};
    this._profileTitle = document.querySelector(".profile__title");
    this._profileSubtitle = document.querySelector(".profile__subtitle");
  }

  getUserInfo() {
    this._values["inputName"] = this._name.textContent;
    this._values["inputAbout"] = this._about.textContent;
    return this._values;
  }

  setUserInfo({ inputName, inputAbout }) {
    this._profileTitle.textContent = inputName;
    this._profileSubtitle.textContent = inputAbout;
  }
}
