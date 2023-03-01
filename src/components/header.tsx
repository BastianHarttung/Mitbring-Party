import classes from "./header.module.scss";
import {NavLink, useLocation} from "react-router-dom";
import {observer} from "mobx-react";
import globalStore from "../stores/global-store";
import logo from "../assets/img/logos/essen_logo_voll.svg";

const Header = () => {
  const {activeId} = globalStore;

  const location = useLocation();
  const cleanLocation = location.pathname.slice(0, location.pathname.lastIndexOf("/"));

  const isLinkActive = cleanLocation === "/wahl" || cleanLocation === "/uebersicht";

  return (
    <nav className={classes.nav}>
      <div className={classes.nav_content}>
        <NavLink to="/"
                 className={({isActive}) => `${classes.link_logo} ${isActive ? classes.link_active : ""}`}>
          <img className={classes.navLogo} src={logo} alt="Picknick"/>
        </NavLink>

        <div className={classes.pages}>
          {isLinkActive &&
              <>
                  <NavLink to={"wahl/" + activeId}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>Wahl</NavLink>
                  <NavLink to={"uebersicht/" + activeId}
                           className={({isActive}) => `${classes.link} ${isActive ? classes.link_active : ""}`}>Übersicht</NavLink>
              </>
          }
        </div>
      </div>
    </nav>

  );
};

export default observer(Header);