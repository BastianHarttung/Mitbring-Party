import classes from "./modal.module.scss";
import globalStore from "../stores/global-store";
import {useState} from "react";
import React from "react";


const Modal = () => {
  const {checkIfAdmin} = globalStore;

  const [password, setPassword] = useState("");

  const checkPassword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        checkIfAdmin(password);
      } catch (e) {
        alert(e);
      }
    } else return;
  };

  return (
    <div className={classes.modal}>
      <div className={classes.inputContainer}>
        <label htmlFor="">Passwort eingeben:</label>
        <input type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               onKeyDown={checkPassword}/>
      </div>
    </div>
  );
};

export default Modal;