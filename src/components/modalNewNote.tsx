import React, {useEffect, useState} from 'react';
import {RiSendPlaneFill} from "react-icons/ri"
import Modal from "../ui-components/Modal";
import Button from "../ui-components/Button";
import {INotiz} from "../interfaces/IParty";
import userStore from "../stores/user-store";


interface ModalNewNoteProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: INotiz) => void;
}

const ModalNewNote = ({isOpen, onClose, onSave}: ModalNewNoteProps) => {

  const {userName} = userStore

  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const [newNote, setNewNote] = useState("");

  const clearInputs = () => {
    setNewNote("");
  }
  const closeModal = () => {
    clearInputs();
    setIsModalOpen(false);
    onClose()
  }

  const handleSubmit = () => {
    if (newNote.trim()) {
      const newNoteObj: INotiz = {
        id: new Date().getTime().toString(),
        name: userName ?? "",
        datum: new Date().toISOString().split("T")[0],  // ISO String in Format "2023-05-28"
        beschreibung: newNote,
      };
      onSave(newNoteObj);
      clearInputs();
      setIsModalOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) setIsModalOpen(true)
  }, [isOpen]);


  return (
    <Modal isOpen={isModalOpen}
           onClose={closeModal}>
      <form className="flex-column-gap-3 width-100">
        <textarea placeholder="Notiz hinzufügen..."
                  value={newNote}
                  onChange={evt => setNewNote(evt.target.value)}/>

        <Button onClick={handleSubmit}
                backIcon={<RiSendPlaneFill/>}>
          Notiz speichern
        </Button>
      </form>
    </Modal>
  );
};

export default ModalNewNote;
