import classes from "./header.module.scss";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import globalStore from "../stores/global-store";
import logo from "../assets/img/logos/essen_logo_voll.svg";
import {FaChevronLeft, FaRegCommentAlt} from "react-icons/fa"

const Header = () => {

  const {activeId, isSettingsOpen, closeSettings, beforeUrl} = globalStore;

  const location = useLocation();
  const cleanLocation = location.pathname.slice(0, location.pathname.lastIndexOf("/"));

  const navigate = useNavigate();

  const isLinkActive = cleanLocation === "/wahl" || cleanLocation === "/uebersicht" || cleanLocation === "/kommentare";

  const handleBackBtnClick = () => {
    navigate(beforeUrl)
    closeSettings()
  }

  return (
    <nav className={classes.nav}>
      <div className={classes.nav_content}>

        {!isSettingsOpen ? <NavLink to="/"
                                    className={({isActive}) => `${classes.link_logo} ${isActive ? classes.link_active : ""}`}>
            <img className={classes.navLogo} src={logo} alt="Picknick"/>
          </NavLink>
          : <FaChevronLeft size={16} className={classes.link_back} onClick={handleBackBtnClick}/>}


        <div className={classes.pages}>
          {isLinkActive &&
              <>
                  <NavLink to={"wahl/" + activeId}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>Wahl</NavLink>
                  <NavLink to={"kommentare/" + activeId}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>
                      <div className={classes.comment_link_container}>
                          <div>5</div>
                          <FaRegCommentAlt size={24}/>
                      </div>
                  </NavLink>
                  <NavLink to={"uebersicht/" + activeId}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>Übersicht</NavLink>
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