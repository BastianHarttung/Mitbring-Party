import "./App.scss";
import { observer } from "mobx-react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RiUserSettingsLine } from "react-icons/ri";

import Wahl from "./pages/Wahl";
import Start from "./pages/Start";
import Uebersicht from "./pages/Uebersicht";
import Admin from "./pages/Admin";
import WrongUrl from "./pages/WrongUrl";
import Notizen from "./pages/Notizen";
import Profil from "./pages/Profil";
import Hilfe from "./pages/Hilfe";
import userStore from "./stores/user-store";
import globalStore from "./stores/global-store";
import Header from "./components/header";
import PopupMessage from "./components/popup-message";
import ModalUserName from "./components/modals/modalUserName";
import ModalPassword from "./components/modals/modalPassword";
import ButtonCircle from "./ui-components/Button-Circle";


function App(): JSX.Element {

  const {
    popupMessage,
    popupStyle,
    isSettingsOpen,
    openSettings,
  } = globalStore;
  const {
    isModalUserNameOpen,
    isModalAdminOpen,
  } = userStore;

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenSettings = () => {
    navigate("/profil");
    openSettings(location.pathname);
  };

  return (
    <>
      {!!popupMessage && <PopupMessage message={popupMessage}
                                       style={popupStyle}/>}

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
          <Route path="notizen/:id"
                 element={<Notizen/>}
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
