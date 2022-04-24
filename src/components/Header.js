import logo from '../assets/img/logos/essen_logo_voll.svg'
import classes from "./Header.module.scss";
import {Link} from "react-router-dom";
import globalStore from "../stores/global-store";
import {observer} from "mobx-react";

const Header = () => {
    const {activeId} = globalStore

    return (
        <div>
            <nav className={classes.nav}>
                <Link to="/">
                    <img className={classes.navLogo} src={logo} alt="Picknick"/>
                </Link>
                <div>
                    <Link to={"wahl/" + activeId} className={classes.link}>Wahl</Link>
                    <Link to={"uebersicht/" + activeId} className={classes.link}>Übersicht</Link>
                </div>
            </nav>
        </div>
    )
}

export default observer(Header)