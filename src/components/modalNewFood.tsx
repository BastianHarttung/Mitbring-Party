import React, {useEffect, useState} from 'react';
import Modal from "../ui-components/Modal";
import Button from "../ui-components/Button";
import {IEssen} from "../interfaces/IParty";
import userStore from "../stores/user-store";


interface ModalNewFoodProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (food: IEssen) => void;
  categories: string[];
}

const ModalNewFood = ({isOpen, onClose, onSave, categories}: ModalNewFoodProps) => {

  const {userName} = userStore

  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const [newFood, setNewFood] = useState("");
  const [category, setCategory] = useState("");

  const clearInputs = () => {
    setNewFood("");
    setCategory("");
  }
  const closeModal = () => {
    clearInputs();
    setIsModalOpen(false);
    onClose()
  }

  const handleSubmit = () => {
    if (newFood && category) {
      const newFoodObj: IEssen = {kategorie: category, essenName: newFood, werBringts: userName ?? ""};
      onSave(newFoodObj);
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
        <input type="text"
               placeholder="Essen"
               value={newFood}
               onChange={evt => setNewFood(evt.target.value)}/>

        <input type="datalist"
               list="kategorie"
               value={category}
               placeholder="Kategorie zB. Salate"
               onChange={evt => setCategory(evt.target.value)}/>
        <datalist id="kategorie">
          {categories.map((kategorie, index) => <option key={index} value={kategorie}/>)
          }
        </datalist>

        <Button onClick={handleSubmit}>Essen hinzufügen</Button>
      </form>
    </Modal>
  );
};

export default ModalNewFood;
