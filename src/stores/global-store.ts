import {makeAutoObservable} from "mobx";
import {emptyPartyCollection} from "../mockup/testConstants";
import {IParty} from "../interfaces/IParty";
import {IEssen} from "../interfaces/IParty";
import {IPartyApp} from "../interfaces/IParty";
import {downloadFromServer, backend, setURL} from "../mini_backend";


class GlobalStore {

  partyCollection: IParty[] = emptyPartyCollection;

  activeId: string = this.partyCollection[this.partyCollection.length - 1].id;

  isAdmin: boolean = false;

  constructor() {
    this.initBackend();
    this.initFromServer();
    makeAutoObservable(this);
  }

  initBackend = () => {
    setURL("https://bastian-harttung-projekte.de/MitbringParty/smallest_backend_ever");
  };

  initFromServer = async (): Promise<void> => {
    await downloadFromServer().then(response => {
      this.partyCollection = backend.getItem("partyCollection");
    });
  };

  checkIfAdmin = (pw: string): void => {
    if (pw === "BastiDev") this.isAdmin = true;
    else throw new Error("Passwort falsch");
  };

  speichereActiveId = (id: string): void => {
    this.activeId = id;
  };

  speichereParty = (party: IParty): void => {
    this.partyCollection.push(party);
  };

  speichereEssen = (id: string | undefined, essen: IEssen) => {
    const partyFind = this.partyCollection.find((part) => part.id.toString() === id);
    if (!!partyFind) {
      partyFind.essen.push(essen);
      this.savePartyToBackend();
    }
  };

  /**
   * Speichere Auswahl und Name
   * @param {string array} checkedEssen checked Essen
   * @param {string} neuerName
   * @param {object} partyObject Object of active Party
   */
  speichereAuswahl = (checkedEssen: string[], neuerName: string, partyObject: IParty): void => {
    const newPartyCollection = this.partyCollection.map((party) => {
      if (party.id === partyObject.id) {
        const newParty = {...party};
        for (let i = 0; i < newParty.essen.length; i++) {
          for (let j = 0; j < checkedEssen.length; j++) {
            if (newParty.essen[i].essenName === checkedEssen[j]) {
              newParty.essen[i].werBringts = neuerName;
            }
          }
        }
        return newParty;
      } else return party;
    });
    this.partyCollection = newPartyCollection;
    this.savePartyToBackend();
  };

  addTeilnehmer = (party: IParty): IPartyApp => {
    const teilnehmerArray = party.essen.map((ess) => {
      return ess.werBringts;
    });
    const clearedTeilnehmerArray = teilnehmerArray.filter((teilnehm, index) => teilnehmerArray.indexOf(teilnehm) === index && teilnehm !== "");
    return {...party, teilnehmer: clearedTeilnehmerArray};
  };

  datumZuLocalString = (datum: string) => {
    return new Date(datum).toLocaleDateString("de-DE",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      },
    );
  };

  updatePartyBackend = (neueParty: IParty) => {
    const partyIndex = this.partyCollection.findIndex((party) => party.id === neueParty.id);
    this.partyCollection.splice(partyIndex, 1, neueParty);
    this.savePartyToBackend();
    this.initFromServer();
  };

  savePartyToBackend = () => {
    backend.setItem("partyCollection", this.partyCollection);
  };

}

const globalStore = new GlobalStore();
export default globalStore;