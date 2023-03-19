import classes from "./modal.module.scss";
import React, {useState} from "react";
import ReactDom from "react-dom";
import {IoMdClose} from "react-icons/io"
import {useNavigate} from "react-router-dom";
import userStore from "../stores/user-store";


const ModalPassword = () => {

  const {checkIfAdmin} = userStore;

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const checkPassword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkIfAdmin(password);
    } else return;
  };

  return (
    <>
      {ReactDom.createPortal(<div className={classes.modal}>
        <div className={classes.inputContainer}>
          <div className={classes.close_btn}>
            <IoMdClose size={24}
                       onClick={() => navigate(-1)}/>
          </div>
          <label htmlFor="">Passwort eingeben:</label>
          <input type="password"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 onKeyDown={checkPassword}/>
        </div>
      </div>, document.getElementById("modal-root") as HTMLElement)}
    </>
  );
};

export default ModalPassword;