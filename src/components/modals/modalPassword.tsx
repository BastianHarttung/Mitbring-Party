import React, { useState } from "react";
import userStore from "../../stores/user-store";
import globalStore from "../../stores/global-store";
import Modal from "../../ui-components/Modal";
import Button from "../../ui-components/Button";


interface ModalPasswordProps {
  isOpen: boolean;
  closeable?: boolean;
}

const ModalPassword = ({isOpen, closeable = true}: ModalPasswordProps) => {

  const {throwPopupMessage} = globalStore;
  const {checkIfAdmin, closeModalAdminPassword} = userStore;

  const [password, setPassword] = useState("");

  const checkPwAndContinue = () => {
    const isCorrectPw = checkIfAdmin(password);
    if (isCorrectPw) {
      handleCloseModal();
    } else {
      throwPopupMessage("Das Passwort ist falsch", "error");
      setPassword("");
    }
  };

  const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkPwAndContinue();
    } else return;
  };

  const handleCloseModal = () => {
    closeModalAdminPassword();
    setPassword("");
  };

  return (
    <Modal isOpen={isOpen}
           onClose={handleCloseModal}
           closeable={closeable}
           heading={"Passwort eingeben"}>

      <div className="flex-column-gap-3">
        <input type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               onKeyDown={pressEnter}/>
        <Button onClick={checkPwAndContinue}>Speichern</Button>
      </div>

    </Modal>
  );
};

export default ModalPassword;
