import {makeAutoObservable} from "mobx";
import {testPartyCollection} from "../mockup/testConstants";

class GlobalStore {

    partyCollection = testPartyCollection;

    activeId = this.partyCollection[this.partyCollection.length - 1].id;

    constructor() {
        makeAutoObservable(this);
    }

    speicherActiveId = (id) => {
        this.activeId = id;
    }

    speichereParty = (party) => {
        console.log(party)
        this.partyCollection.push(party)
    }

    speichereEssen = (essen) => {
        // console.log('speichere Essen', essen)
        // const newParty = {...party};
        // newParty.essen.push(essen)
        // setParty(newParty)
        // console.log(party)
    }

    /**
     * Speichere Auswahl und Name
     * @param {array} checkedEssen checked Essen
     * @param {string} neuerName
     * @param {object} partyObject Object of active Party
     */
    speichereAuswahl = (checkedEssen, neuerName, partyObject) => {
        //console.log(checkedEssen, neuerName, partyObject)
        const newPartyCollection = this.partyCollection.map((party) => {
            if (party.id === partyObject.id) {
                const newParty = {...party}
                newParty.teilnehmer.push(neuerName)
                for (let i = 0; i < newParty.essen.length; i++) {
                    for (let j = 0; j < checkedEssen.length; j++) {
                        if (newParty.essen[i].essenName === checkedEssen[j]) {
                            newParty.essen[i].werBringts = neuerName
                        }
                    }
                }
                return newParty
            } else return party
        });
        this.partyCollection = newPartyCollection;
    }

    datumZuLocalString = (datum) => {
        return new Date(datum).toLocaleDateString("de-DE",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );
    }

    updateParty = (id) => {
        const actualParty = this.partyCollection.filter((party) => party.id = id)
        console.log(actualParty)
    }

}

const globalStore = new GlobalStore();
export default globalStore;