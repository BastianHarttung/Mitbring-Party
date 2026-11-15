import {makeAutoObservable, runInAction} from "mobx";
import {backend, downloadFromServer} from "../mini_backend";


const ADMIN_PASSWORD_KEY = "adminPassword";

export interface IUserStore {
  userName: string | null;
  isAdmin: boolean;
  isModalUserNameOpen: boolean;
  isModalAdminOpen: boolean;
}

class UserStore {

  userName: string | null = null;

  isAdmin: boolean = false;

  isModalUserNameOpen: boolean = true;

  isModalAdminOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromStorage()
  }

  loadUserFromStorage = () => {
    const userNameStorage = localStorage.getItem("userName")
    const isAdminStorage = localStorage.getItem("isAdmin")
    if (userNameStorage) {
      this.userName = userNameStorage;
      this.isModalUserNameOpen = false;
    }
    if (isAdminStorage) {
      this.isAdmin = isAdminStorage === "true"
    }
  }

  setUserName = (name: string): void => {
    this.userName = name
    localStorage.setItem("userName", name)
  }

  /**
   * Prüft das Passwort gegen "adminPassword" aus der database.json.
   * Lädt vorher die aktuelle database.json vom Server.
   */
  checkIfAdmin = async (pw: string): Promise<boolean> => {
    await downloadFromServer();
    const storedPassword: string | null = backend.getItem(ADMIN_PASSWORD_KEY);
    if (!storedPassword) {
      console.error(`Kein "${ADMIN_PASSWORD_KEY}" in der database.json gefunden`);
      return false;
    }
    const isCorrect = pw === storedPassword;
    if (isCorrect) {
      runInAction(() => {
        this.isAdmin = true;
      });
      localStorage.setItem("isAdmin", "true");
    }
    return isCorrect;
  };

  /**
   * Setzt ein neues Admin-Passwort (nur als Admin).
   * Da mini_backend immer die komplette database.json schreibt, bleiben alle anderen Einträge erhalten.
   */
  setAdminPassword = async (newPw: string): Promise<void> => {
    if (!this.isAdmin) throw new Error("Nur Admins dürfen das Passwort ändern");
    await downloadFromServer();
    await backend.setItem(ADMIN_PASSWORD_KEY, newPw);
  };

  adminLogout = (): void => {
    console.log("Admin Logout")
    this.isAdmin = false
    localStorage.removeItem("isAdmin")
  }

  closeModalUserName = (): void => {
    this.isModalUserNameOpen = false
  }

  closeModalAdminPassword = (): void => {
    this.isModalAdminOpen = false
  }

  openModalAdminPassword = (): void => {
    this.isModalAdminOpen = true
  }

}

const userStore = new UserStore();
export default userStore;