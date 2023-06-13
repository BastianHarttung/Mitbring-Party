import classes from "./header.module.scss";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa"
import globalStore from "../stores/global-store";
import userStore from "../stores/user-store";
import logo from "../assets/img/logos/essen_logo_voll.svg";
import notesIcon from "../assets/img/icons/comment_bubble_speach.svg";

const Header = () => {

  const {
    activeId,
    isSettingsOpen,
    openSettings,
    closeSettings,
    beforeUrl,
    notesCount
  } = globalStore;

  const {isAdmin} = userStore

  const location = useLocation();
  const cleanLocation = location.pathname.slice(0, location.pathname.lastIndexOf("/"));

  const navigate = useNavigate();

  const isLinkActive = cleanLocation === "/wahl" || cleanLocation === "/uebersicht" || cleanLocation === "/notizen";

  const handleBackBtnClick = () => {
    navigate(beforeUrl)
    closeSettings()
  }

  useEffect(() => {
    const isProfileActive = location.pathname.slice() === "/profil" || location.pathname.slice() === "/hilfe"
    if (isProfileActive) {
      openSettings(beforeUrl)
    }
  }, [location.pathname, openSettings, beforeUrl]);


  return (
    <nav className={classes.nav}>
      <div className={classes.nav_content}>

        <div>
          {(!isSettingsOpen && isAdmin) &&
              <NavLink to="/"
                       className={({isActive}) => `${classes.link_logo} ${isActive ? classes.link_active : ""}`}>
                  <img className={classes.navLogo} src={logo} alt="Picknick"/>
              </NavLink>
          }

          {isSettingsOpen && <FaChevronLeft size={16} className={classes.link_back} onClick={handleBackBtnClick}/>}
        </div>

        <div className={classes.pages}>
          {isLinkActive &&
              <>
                  <NavLink to={"wahl/" + activeId}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>
                      Wahl
                  </NavLink>

                  <NavLink to={"notizen/" + activeId}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>
                      <div className={classes.comment_link_container}>
                          <div>{notesCount > 0 ? notesCount : ""}</div>
                          <img className={classes.navLogo} src={notesIcon} alt="Notizen"/>
                      </div>
                  </NavLink>

                  <NavLink to={"uebersicht/" + activeId}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>
                      Übersicht
                  </NavLink>
              </>
          }
          {isSettingsOpen &&
              <>
                  <NavLink to={"profil"}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>Profil</NavLink>
                  <NavLink to={"hilfe"}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>Hilfe</NavLink>
              </>}
        </div>
      </div>
    </nav>

  );
};

export default observer(Header);