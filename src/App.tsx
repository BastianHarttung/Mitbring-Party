import "./App.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./components/Header";
import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";
import Admin from "./pages/Admin";
import WrongUrl from "./pages/WrongUrl";

function App(): JSX.Element {

  return (
    <BrowserRouter basename={"/MitbringParty"}>

      <Header/>

      <div className="page-container">
        <Routes>
          <Route path="/"
                 element={<Start/>}
          />
          <Route path="wahl/:id"
                 element={<Wahl/>}
          />
          <Route path="uebersicht/:id"
                 element={<Uebersicht/>}
          />
          <Route path="admin/:id"
                 element={<Admin/>}
          />
          <Route path="*"
                 element={<WrongUrl/>}/>
        </Routes>
      </div>


    </BrowserRouter>
  );

}

export default App;