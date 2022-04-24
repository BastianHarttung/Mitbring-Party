import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./components/Header";
import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";
import Admin from "./pages/Admin";

function App() {

    return (
        <BrowserRouter basename={'/MitbringParty'}>

            <Header/>

            <div className="page-container">
                <Routes>
                    <Route path='/'
                           exact={true}
                           element={<Start/>}
                    />
                    <Route path='wahl/:id'
                           exact={true}
                           element={<Wahl/>}
                    />
                    <Route path='uebersicht/:id'
                           exact={true}
                           element={<Uebersicht/>}
                    />
                    <Route path='admin/:id'
                           exact={true}
                           element={<Admin/>}
                    />
                </Routes>
            </div>


        </BrowserRouter>
    );

}

export default App;
