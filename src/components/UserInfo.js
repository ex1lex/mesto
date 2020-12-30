export class UserInfo {
  constructor({ selectorName, selectorAbout }) {
    this._name = document.querySelector(selectorName);
    this._about = document.querySelector(selectorAbout);
    this._values = {};
  }

  getUserInfo() {
    this._values["inputName"] = this._name.textContent;
    this._values["inputAbout"] = this._about.textContent;
    return this._values;
  }

  setUserInfo({ inputName, inputAbout }) {
    this._name.textContent = inputName;
    this._about.textContent = inputAbout;
  }
}
