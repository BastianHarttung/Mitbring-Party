import "./App.scss";
import {observer} from "mobx-react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {RiUserSettingsLine} from "react-icons/ri"

import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";
import Admin from "./pages/Admin";
import WrongUrl from "./pages/WrongUrl";
import globalStore from "./stores/global-store";
import Header from "./components/header";
import ErrorMessage from "./components/error-message";
import ButtonCircle from "./ui-components/Button-Circle";


function App(): JSX.Element {

  const {errorMessage, isSettingsOpen, openSettings} = globalStore;

  const navigate = useNavigate()
  const location = useLocation()

  const handleOpenSettings = () => {
    navigate("/profil")
    openSettings(location.pathname)
  }

  return (
    <>
      {!!errorMessage && <ErrorMessage message={errorMessage}/>}

      <Header/>
      {!isSettingsOpen && <ButtonCircle icon={<RiUserSettingsLine size={24} color={"white"}/>}
                                        onClick={handleOpenSettings}/>}

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
    </>
  );

}

export default observer(App);
