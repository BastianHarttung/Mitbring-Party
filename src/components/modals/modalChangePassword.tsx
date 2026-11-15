import React, { useState } from "react";
import userStore from "../../stores/user-store";
import globalStore from "../../stores/global-store";
import Modal from "../../ui-components/Modal";
import Button from "../../ui-components/Button";


interface ModalChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalChangePassword = ({isOpen, onClose}: ModalChangePasswordProps) => {

  const {throwPopupMessage} = globalStore;
  const {setAdminPassword} = userStore;

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleClose = () => {
    setNewPassword("");
    setRepeatPassword("");
    onClose();
  };

  const handleSave = async () => {
    if (isSaving) return;
    if (newPassword.trim() === "") {
      throwPopupMessage("Das Passwort darf nicht leer sein", "error");
      return;
    }
    if (newPassword !== repeatPassword) {
      throwPopupMessage("Die Passwörter stimmen nicht überein", "error");
      return;
    }
    setIsSaving(true);
    try {
      await setAdminPassword(newPassword);
      throwPopupMessage("Passwort geändert");
      handleClose();
    } catch (error) {
      console.log(error);
      throwPopupMessage("Passwort konnte nicht gespeichert werden", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSave();
  };

  return (
    <Modal isOpen={isOpen}
           onClose={handleClose}
           heading={"Admin-Passwort ändern"}>

      <div className="flex-column-gap-3">
        <input type="password"
               placeholder="Neues Passwort"
               value={newPassword}
               onChange={e => setNewPassword(e.target.value)}
               onKeyDown={pressEnter}/>
        <input type="password"
               placeholder="Neues Passwort wiederholen"
               value={repeatPassword}
               onChange={e => setRepeatPassword(e.target.value)}
               onKeyDown={pressEnter}/>
        <Button onClick={handleSave}>Speichern</Button>
      </div>

    </Modal>
  );
};

export default ModalChangePassword;
