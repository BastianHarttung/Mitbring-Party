import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./components/Header";
import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";


function App() {

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
                           element={<Wahl/>}
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
