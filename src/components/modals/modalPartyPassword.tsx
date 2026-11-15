import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalStore from "../../stores/global-store";
import { IParty } from "../../interfaces/IParty";
import { pruefePartyPasswort } from "../../helper-functions/helper-functions";
import Modal from "../../ui-components/Modal";
import Button from "../../ui-components/Button";
import PasswordInput from "../../ui-components/PasswordInput";


interface ModalPartyPasswordProps {
  party: IParty;
  onSuccess: () => void;
}

/** Fragt das Passwort einer geschützten Party ab, bevor die Party angezeigt wird */
const ModalPartyPassword = ({party, onSuccess}: ModalPartyPasswordProps) => {

  const {throwPopupMessage} = globalStore;
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const checkPwAndContinue = async () => {
    let isCorrectPw = false;
    try {
      isCorrectPw = await pruefePartyPasswort(party, password);
    } catch (error) {
      console.log(error);
    }
    if (isCorrectPw) {
      setPassword("");
      onSuccess();
    } else {
      throwPopupMessage("Das Passwort ist falsch", "error");
      setPassword("");
    }
  };

  const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") checkPwAndContinue();
  };

  return (
    <Modal isOpen={true}
           onClose={() => {}}
           closeable={false}
           dark={true}
           heading={`„${party.partyName}“ ist passwortgeschützt`}>

      <div className="flex-column-gap-3">
        <PasswordInput value={password}
                       onChange={setPassword}
                       onKeyDown={pressEnter}
                       autoFocus/>
        <Button onClick={checkPwAndContinue}>Öffnen</Button>
        <Button btnStyle="secondary"
                onClick={() => navigate("/")}>
          Zur Startseite
        </Button>
      </div>

    </Modal>
  );
};

export default ModalPartyPassword;
