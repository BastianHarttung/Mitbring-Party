import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";

import Header from "./components/Header";
import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";
import {Essen, Party} from "./models/party";


function App() {

    const emptyParty = new Party('', '', '', '', [])
    const testPartyCollection = [
        new Party('Fondue 2021', 'Hip', '2021-12-25', 'Das alljährliche Fondue.',
            [
                new Essen('Salate', 'Kartoffelsalat', 'Bastian'),
                new Essen('Salate', 'Tomatensalat', 'Sabrina'),
                new Essen('Sonstiges', 'Würstchen', 'Sabrina'),
                new Essen('Süßes', 'Kuchen', ''),
                new Essen('Süßes', 'Schokolade', '')
            ]),
        new Party('Picknick Geburtstagsparty Basti 2022', 'Rothsee', '2022-05-23', 'Das wird ein Geburtstagspicknick',
            [
                new Essen('Salate', 'Blattsalat', 'Bastian'),
                new Essen('Salate', 'Nudelsalat', 'Sabrina'),
                new Essen('Sonstiges', 'Eier', 'Patrick'),
                new Essen('Süßes', 'Kuchen', 'Silke'),
                new Essen('Süßes', 'Muffin', ''),
                new Essen('Süßes', 'Gummibären', ''),
            ])
    ]
    const testParty = new Party(
        'Fondue 2021',
        'Hip',
        '23.5.2022',
        'Das wird ein Geburtstagspicknick',
        [
            new Essen('Salate', 'Kartoffelsalat', 'Bastian'),
            new Essen('Salate', 'Nudelsalat', 'Sabrina'),
            new Essen('Sonstiges', 'Würstchen', ''),
            new Essen('Süßes', 'Kuchen', '')
        ])

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
            if (party === partyObject) {
                const newParty = {...party}
                newParty.persons.push(neuerName)
                for (let i = 0; i < newParty.essen.length; i++) {
                    for (let j = 0; j < checkedEssen.length; j++) {
                        if (newParty.essen[i].essenName === checkedEssen[j]){
                            newParty.essen[i].werBringts = neuerName
                        }
                    }
                }
                return newParty
            } else return party
        });
        console.log(newPartyCollection)
        setPartyCollection(newPartyCollection)
    }

}

export default App;
