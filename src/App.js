import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";

import Header from "./components/Header";
import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";
import {Essen, Party} from "./models/party";


function App() {

    const emptyParty = new Party( '', '', '', '', [])
    const partyCollection = [
        new Party( 'Fondue 2021', 'Hip', '2021-12-25', 'Das alljährliche Fondue.',
            [
                new Essen('Salate', 'Kartoffelsalat', 'Bastian'),
                new Essen('Salate', 'Tomatensalat', 'Sabrina'),
                new Essen('Sonstiges', 'Würstchen', ''),
                new Essen('Süßes', 'Kuchen', '')
            ]),
        new Party('Picknick Geburtstagsparty Basti 2022', 'Rothsee', '2022-05-23', 'Das wird ein Geburtstagspicknick',
            [
                new Essen('Salate', 'Blattsalat', 'Bastian'),
                new Essen('Salate', 'Nudelsalat', 'Sabrina'),
                new Essen('Sonstiges', 'Eier', 'Patrick'),
                new Essen('Süßes', 'Kuchen', 'Silke')
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

    const [party, setParty] = useState(testParty)

    return (
        <BrowserRouter>

            <Header/>

            <div className="page-container">
                <Routes>
                    <Route path='/'
                           exact={true}
                           element={<Start partyCollection={partyCollection}
                                           partySpeichern={(party) => {speichereParty(party)}}/>}
                    />
                    <Route path='/wahl'
                           exact={true}
                           element={<Wahl party={partyCollection[0]}
                                          speichereEssen={(essen) => speichereEssen(essen)}
                                          speichereAuswahl={(essenArray) => speichereAuswahl(essenArray)}/>}
                    />
                    <Route path='/uebersicht'
                           exact={true}
                           element={<Uebersicht/>}
                    />
                </Routes>
            </div>


        </BrowserRouter>
    );

    function speichereParty(party){
        console.log(party)
        partyCollection.push(party)
    }

    function speichereEssen(essen) {
        //console.log('speichere Essen', essen)
        const newParty = {...party};
        newParty.essen.push(essen)
        setParty(newParty)
        //console.log(party)
    }

    function speichereAuswahl(essenArray) {
        const newParty = {...party};
        for (let i = 0; i < newParty.essen.length; i++) {
            for (let j = 0; j < essenArray.length; j++) {
                if (newParty.essen[i].essenName === essenArray[j].essenName) {
                    newParty.essen[i].werBringts = essenArray[j].werBringts
                }
            }
        }
        setParty(newParty)
    }

}

export default App;
