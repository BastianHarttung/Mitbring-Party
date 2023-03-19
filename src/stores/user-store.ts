import {makeAutoObservable} from "mobx";


class UserStore {

  isAdmin: boolean = false;


  constructor() {
    makeAutoObservable(this);
  }

  checkIfAdmin = (pw: string): void => {
    if (pw === "BastiDev") this.isAdmin = true;
    // else this.throwErrorMessage("Passwort falsch"); TODO
  };

}

const userStore = new UserStore();
export default userStore;