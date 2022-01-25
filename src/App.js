import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";

import Header from "./components/Header";
import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";
import {Essen, Party} from "./models/party";


function App() {

    const emptyParty = new Party(0, '', '', '', '', [])
    const testParty = new Party(1,
        'Fondue 2021',
        'Hip',
        '23.5.2022',
        'Das wird ein Geburtstagspicknick',
        [
            new Essen('Salate','Kartoffelsalat', 'Bastian'),
            new Essen('Salate','Nudelsalat', 'Sabrina'),
            new Essen('Sonstiges','Würstchen', '')
        ])

    const [party, setParty] = useState(testParty)

    return (
        <BrowserRouter>

            <Header/>

            <div className="page-container">
                <Routes>
                    <Route path='/'
                           exact={true}
                           element={<Start/>}
                    />
                    <Route path='/wahl'
                           exact={true}
                           element={<Wahl party={party}/>}
                    />
                    <Route path='/uebersicht'
                           exact={true}
                           element={<Uebersicht/>}
                    />
                </Routes>
            </div>


        </BrowserRouter>
    );

}

export default App;
