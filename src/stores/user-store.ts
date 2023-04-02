import {makeAutoObservable} from "mobx";


export interface IUserStore {
  userName: string | null;
  isAdmin: boolean;
}

class UserStore {

  userName: string | null = null;

  isAdmin: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromStorage()
  }

  loadUserFromStorage = () => {
    const userNameStorage = localStorage.getItem("userName")
    const isAdminStorage = localStorage.getItem("isAdmin")
    if (userNameStorage) this.userName = userNameStorage
    if (isAdminStorage) this.isAdmin = isAdminStorage === "true"
  }

  setUserName = (name: string): void => {
    this.userName = name
    localStorage.setItem("userName", name)
  }

  checkIfAdmin = (pw: string): void => {
    if (pw === "BastiDev") {
      this.isAdmin = true
      localStorage.setItem("isAdmin", "true")
    }
    // else this.throwErrorMessage("Passwort falsch"); TODO
  };

}

const userStore = new UserStore();
export default userStore;