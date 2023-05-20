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
import Profil from "./pages/Profil";
import Hilfe from "./pages/Hilfe";
import userStore from "./stores/user-store";
import ModalUserName from "./components/modalUserName";
import ModalPassword from "./components/modalPassword";


function App(): JSX.Element {

  const {errorMessage, isSettingsOpen, openSettings} = globalStore;
  const {isModalUserNameOpen, isModalAdminOpen} = userStore

  const navigate = useNavigate()
  const location = useLocation()

  const handleOpenSettings = () => {
    navigate("/profil")
    openSettings(location.pathname)
  }

  return (
    <>
      {!!errorMessage && <ErrorMessage message={errorMessage}/>}

      <ModalUserName isOpen={isModalUserNameOpen}/>
      <ModalPassword isOpen={isModalAdminOpen}/>

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
          <Route path="profil"
                 element={<Profil/>}
          />
          <Route path="hilfe"
                 element={<Hilfe/>}
          />
          <Route path="*"
                 element={<WrongUrl/>}/>
        </Routes>
      </main>
    </>
  );

}

export default observer(App);
