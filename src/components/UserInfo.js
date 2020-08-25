export default class UserInfo {
  constructor({ userNameSelector, userAboutMeSelector, userAvatarSelector, id }) {
    this._fullName = userNameSelector;
    this._aboutMe = userAboutMeSelector;
    this._avatar = userAvatarSelector;
    this._id = id;
    }
  getUserInfo() {
    return {
      full_name: this._fullName.textContent,
      about_me: this._aboutMe.textContent
    };
  }
  setUserInfo(name, about) {
    this._fullName.textContent = name;
    this._aboutMe.textContent = about;
  }
  setUserId(id){
    this.id = id;
  }
  setUserAvatar(newAvatar){
    this._avatar.src = newAvatar;
  }
}