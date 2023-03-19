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
  }

  setUserName = (name: string): void => {
    this.userName = name
  }

  checkIfAdmin = (pw: string): void => {
    if (pw === "BastiDev") this.isAdmin = true;
    // else this.throwErrorMessage("Passwort falsch"); TODO
  };

}

const userStore = new UserStore();
export default userStore;