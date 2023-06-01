import {makeAutoObservable} from "mobx";
import {emptyPartyCollection} from "../mockup/testConstants";
import {INotiz, IParty} from "../interfaces/IParty";
import {IEssen} from "../interfaces/IParty";
import {IPartyApp} from "../interfaces/IParty";
import {downloadFromServer, backend, setURL} from "../mini_backend";
import {TPopupStyle} from "../interfaces/Types";


class GlobalStore {

  partyCollection: IParty[] = emptyPartyCollection;

  activeId: string = this.partyCollection[this.partyCollection.length - 1].id;

  popupMessage: string = "";
  popupStyle: TPopupStyle | undefined = undefined;

  isSettingsOpen: boolean = false;

  beforeUrl: string = "";

  isLoading: boolean = false;

  notesCount: number = 0;

  constructor() {
    this.initBackend();
    this.initFromServer();
    makeAutoObservable(this);
  }

  initBackend = () => {
    setURL("https://bastian-harttung-projekte.de/MitbringParty/smallest_backend_ever");
  };

  initFromServer = (): void => {
    this.isLoading = true;
    downloadFromServer()
      .then((resolve) => {
        this.partyCollection = backend.getItem("partyCollection");
        // Sort by Date
        this.partyCollection.sort((a, b) => {
          if (a.datum < b.datum) return 1;
          if (a.datum > b.datum) return -1;
          else return 0;
        });
      })
      .catch(error => {
        this.throwPopupMessage("Something went wrong", "error")
        console.log(error)
      })
      .finally(() => {
        this.isLoading = false
      })
  };

  speichereActiveId = (id: string): void => {
    this.activeId = id;
  };

  speichereNotesCount = (count: number): void => {
    this.notesCount = count
  }

  speichereParty = (party: IParty): void => {
    this.partyCollection.push(party);
    this.savePartyToBackend();
    this.initFromServer();
  };

  speichereEssen = (id: string | undefined, essen: IEssen) => {
    const partyFind = this.partyCollection.find((part) => part.id === id);
    if (!!partyFind) {
      partyFind.essen.push(essen);
      this.savePartyToBackend();
    }
  };

  speichereNotiz = (id: string | undefined, note: INotiz) => {
    const partyFind = this.partyCollection.find((party) => party.id === id);
    if (!!partyFind) {
      partyFind.notizen = [...partyFind.notizen, note]
      this.savePartyToBackend()
    }
  }

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
            // Add Name To Essen
            if (newParty.essen[i].essenName === checkedEssen[j]) {
              newParty.essen[i].werBringts = neuerName;
            }
          }
          // Delete Name From Other Essen
          if (newParty.essen[i].werBringts === neuerName && !checkedEssen.includes(newParty.essen[i].essenName)) {
            newParty.essen[i].werBringts = "";
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

  throwPopupMessage = (message: string, style?: TPopupStyle) => {
    this.popupStyle = style;
    this.popupMessage = message;
    setTimeout(() => this.popupMessage = "", 2500);
  };

  updatePartyBackend = (neueParty: IParty) => {
    const partyIndex = this.partyCollection.findIndex((party) => party.id === neueParty.id);
    this.partyCollection.splice(partyIndex, 1, neueParty);
    this.savePartyToBackend();
    this.initFromServer();
  };

  loeschePartyBackend = (id: string) => {
    this.partyCollection = this.partyCollection.filter((party) => party.id !== id);
    this.savePartyToBackend();
    this.initFromServer();
  };

  savePartyToBackend = () => {
    backend.setItem("partyCollection", this.partyCollection);
  };

  openSettings = (url: string) => {
    this.beforeUrl = url;
    this.isSettingsOpen = true;
  };

  closeSettings = () => {
    this.isSettingsOpen = false;
  };

  /**
   * Find and filter Categories
   * @return {*[]} return Array with unique categories as string of party
   */
  findKategorien = (party: IParty): string[] => {
    const vorhandeneKategorienArray = party.essen.map((essen) => {
      return essen.kategorie;
    }, []);
    const kategorieArray = [...vorhandeneKategorienArray, "Sonstiges"];
    return kategorieArray.filter((item, index) => kategorieArray.indexOf(item) === index);
  };

}

const globalStore = new GlobalStore();
export default globalStore;
