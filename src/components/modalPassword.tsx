import React, {useState} from "react";
import userStore from "../stores/user-store";
import Modal from "../ui-components/Modal";
import Button from "../ui-components/Button";


interface ModalPasswordProps {
  isOpen: boolean
}

const ModalPassword = ({isOpen}: ModalPasswordProps) => {

  const {checkIfAdmin, closeModalAdminPassword} = userStore;

  const [password, setPassword] = useState("");

  const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkIfAdmin(password);
    } else return;
  };

  const handleButtonClick = () => {
    const isCorrectPw = checkIfAdmin(password)
    if (isCorrectPw) {
      closeModalAdminPassword()
      setPassword("")
    } else {
      setPassword("")
    }
  }

  const handleCloseModal = () => {
    closeModalAdminPassword()
    setPassword("")
  }

  return (
    <Modal isOpen={isOpen}
           onClose={handleCloseModal}
           heading={"Passwort eingeben"}>

      <div className="flex-column-gap-3">
        <input type="password"
               value={password}
               onChange={e => setPassword(e.target.value)}
               onKeyDown={pressEnter}/>
        <Button onClick={handleButtonClick}>Speichern</Button>
      </div>

    </Modal>
  );
};

export default ModalPassword;