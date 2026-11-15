import {makeAutoObservable, runInAction} from "mobx";
import {backend, downloadFromServer} from "../mini_backend";


const ADMIN_PASSWORD_KEY = "adminPassword";

/**
 * Erzeugt einen SHA-256-Hash (hex) des übergebenen Strings.
 * Hinweis: crypto.subtle ist nur in sicheren Kontexten verfügbar (HTTPS oder localhost).
 */
const hashPassword = async (pw: string): Promise<string> => {
  const data = new TextEncoder().encode(pw);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
};

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
   * Prüft das Passwort gegen den SHA-256-Hash "adminPassword" aus der database.json.
   * Lädt vorher die aktuelle database.json vom Server.
   */
  checkIfAdmin = async (pw: string): Promise<boolean> => {
    await downloadFromServer();
    const storedHash: string | null = backend.getItem(ADMIN_PASSWORD_KEY);
    if (!storedHash) {
      console.error(`Kein "${ADMIN_PASSWORD_KEY}" in der database.json gefunden`);
      return false;
    }
    const isCorrect = (await hashPassword(pw)) === storedHash.toLowerCase();
    if (isCorrect) {
      runInAction(() => {
        this.isAdmin = true;
      });
      localStorage.setItem("isAdmin", "true");
    }
    return isCorrect;
  };

  /**
   * Setzt ein neues Admin-Passwort (nur als Admin). Gespeichert wird nur der SHA-256-Hash.
   * Da mini_backend immer die komplette database.json schreibt, bleiben alle anderen Einträge erhalten.
   */
  setAdminPassword = async (newPw: string): Promise<void> => {
    if (!this.isAdmin) throw new Error("Nur Admins dürfen das Passwort ändern");
    await downloadFromServer();
    await backend.setItem(ADMIN_PASSWORD_KEY, await hashPassword(newPw));
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