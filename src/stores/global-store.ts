import {makeAutoObservable} from "mobx";
import {testPartyCollection} from "../mockup/testConstants";
import {IParty} from "../interfaces/IParty";
import {IEssen} from "../interfaces/IParty";
import {IPartyApp} from "../interfaces/IParty";

class GlobalStore {

  partyCollection: IParty[] = testPartyCollection;

  activeId: string = this.partyCollection[this.partyCollection.length - 1].id;

  constructor() {
    makeAutoObservable(this);
  }

  speichereActiveId = (id: string) => {
    this.activeId = id;
  };

  speichereParty = (party: IParty) => {
    console.log(party);
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
    const newPartyCollection = this.partyCollection.map((party) => {
      if (party.id === partyObject.id) {
        const newParty = {...party};
        // newParty.teilnehmer.push(neuerName);
        // for (let i = 0; i < newParty.essen.length; i++) {
        //   for (let j = 0; j < checkedEssen.length; j++) {
        //     if (newParty.essen[i].essenName === checkedEssen[j]) {
        //       newParty.essen[i].werBringts = neuerName;
        //     }
        //   }
        // }
        return newParty;
      } else return party;
    });
    this.partyCollection = newPartyCollection;
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

  updatePartyBackend = (party: IParty) => {
    const partyIndex = this.partyCollection.findIndex((part) => part.id = party.id);
    console.log(partyIndex);
  };

}

const globalStore = new GlobalStore();
export default globalStore;