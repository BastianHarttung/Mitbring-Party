import "./App.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Header from "./components/header";
import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";
import Admin from "./pages/Admin";
import WrongUrl from "./pages/WrongUrl";
import globalStore from "./stores/global-store";
import {observer} from "mobx-react";
import ErrorMessage from "./components/error-message";

function App(): JSX.Element {

  const {errorMessage} = globalStore;

  return (
    <BrowserRouter basename={"/MitbringParty"}>

      {!!errorMessage && <ErrorMessage message={errorMessage}/>}

      <Header/>

      <main>
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
      </main>


    </BrowserRouter>
  );

}

export default observer(App);
