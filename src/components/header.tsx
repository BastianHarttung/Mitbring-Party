import logo from "../assets/img/logos/essen_logo_voll.svg";
import classes from "./header.module.scss";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import globalStore from "../stores/global-store";
import {observer} from "mobx-react";

const Header = () => {
  const {activeId} = globalStore;

  const location = useLocation();
  const cleanLocation = location.pathname.slice(0, location.pathname.lastIndexOf("/"));

  const isLinkActive = cleanLocation === "/wahl" || cleanLocation === "/uebersicht";

  return (
    <div>
      <nav className={classes.nav}>
        <Link to="/">
          <img className={classes.navLogo} src={logo} alt="Picknick"/>
        </Link>
        {isLinkActive &&
          <div>
            <Link to={"wahl/" + activeId} className={classes.link}>Wahl</Link>
            <Link to={"uebersicht/" + activeId} className={classes.link}>Übersicht</Link>
          </div>}
      </nav>
    </div>
  );
};

export default observer(Header);