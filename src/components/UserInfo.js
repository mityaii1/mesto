export default class UserInfo {
  constructor({ userNameSelector, userAboutMeSelector }) {
    this._fullName = userNameSelector;
    this._aboutMe = userAboutMeSelector;
  }
  getUserInfo() {
    return {
      full_name: this._fullName.textContent,
      about_me: this._aboutMe.textContent
    };
  }
  setUserInfo(full_name, about_me) {
    this._fullName.textContent = full_name.value;
    this._aboutMe.textContent = about_me.value;
  }
}