import {makeAutoObservable} from "mobx";
import {emptyPartyCollection} from "../mockup/testConstants";
import {IParty} from "../interfaces/IParty";
import {IEssen} from "../interfaces/IParty";
import {downloadFromServer, backend, setURL} from "../mini_backend";


class GlobalStore {

  partyCollection: IParty[] = emptyPartyCollection;

  activeId: number = this.partyCollection[this.partyCollection.length - 1].id;

  constructor() {
    this.initBackend();
    this.initFromServer();
    makeAutoObservable(this);
  }

  initBackend = () => {
    setURL('https://bastian-harttung-projekte.de/MitbringParty/smallest_backend_ever');
  }

  initFromServer = async () => {
    await downloadFromServer().then(response => {
      this.partyCollection = JSON.parse(backend.getItem('partyCollection')) || {};
    })
  };

  speicherActiveId = (id: number) => {
    this.activeId = id;
  };

  speichereParty = (party: IParty) => {
    this.partyCollection.push(party);
  };

  speichereEssen = (essen: IEssen) => {
    // console.log('speichere Essen', essen)
    // const newParty = {...party};
    // newParty.essen.push(essen)
    // setParty(newParty)
    // console.log(party)
  };

  /**
   * Speichere Auswahl und Name
   * @param {array} checkedEssen checked Essen
   * @param {string} neuerName
   * @param {object} partyObject Object of active Party
   */
  speichereAuswahl = (checkedEssen: any, neuerName: string, partyObject: IParty) => {
    //console.log(checkedEssen, neuerName, partyObject)
    const newPartyCollection = this.partyCollection.map((party) => {
      if (party.id === partyObject.id) {
        const newParty = {...party};
        newParty.teilnehmer.push(neuerName);
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

  updateParty = (id: number) => {
    const actualParty = this.partyCollection.filter((party) => party.id = id);
    // console.log(actualParty);
  };

}

const globalStore = new GlobalStore();
export default globalStore;