import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";

import Header from "./components/Header";
import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";

import {testPartyCollection} from "./mockup/testConstants";


function App() {

    const [partyCollection, setPartyCollection] = useState(testPartyCollection)

    const [activeId, setActiveId] = useState(partyCollection[partyCollection.length - 1].id)

    return (
        <BrowserRouter>

            <Header activeId={activeId}/>

            <div className="page-container">
                <Routes>
                    <Route path='/'
                           exact={true}
                           element={<Start partyCollection={partyCollection}
                                           partySpeichern={(party) => speichereParty(party)}
                                           idSpeichern={(id) => setActiveId(id)}/>}
                    />
                    <Route path='/wahl/:id'
                           exact={true}
                           element={<Wahl partyCollection={partyCollection}
                                          speichereEssen={(essen) => speichereEssen(essen)}
                                          speichereAuswahl={(checkedEssen, neuerName, partyObject) => speichereAuswahl(checkedEssen, neuerName, partyObject)}/>}
                    />
                    <Route path='/uebersicht/:id'
                           exact={true}
                           element={<Uebersicht partyCollection={partyCollection}/>}
                    />
                </Routes>
            </div>


        </BrowserRouter>
    );

    function speichereParty(party) {
        console.log(party)
        partyCollection.push(party)
    }

    function speichereEssen(essen) {
        //console.log('speichere Essen', essen)
        /*const newParty = {...party};
        newParty.essen.push(essen)
        setParty(newParty)*/
        //console.log(party)
    }

    /**
     * Speichere Auswahl und Name
     * @param {array} checkedEssen checked Essen
     * @param {string} neuerName
     * @param {object} partyObject Object of active Party
     */
    function speichereAuswahl(checkedEssen, neuerName, partyObject) {
        //console.log(checkedEssen, neuerName, partyObject)
        const newPartyCollection = partyCollection.map((party) => {
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
        setPartyCollection(newPartyCollection)
    }

}

export default App;
