import React from 'react';
import Modal from "../ui-components/Modal";
import Button from "../ui-components/Button";


interface ModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ModalConfirmDelete = ({isOpen, onClose, onDelete}: ModalConfirmDeleteProps) => {

  return (
    <Modal isOpen={isOpen}
           onClose={() => onClose()}
           closeable
           heading={"Party wirklich löschen?"}>
      <div className="flex-row justify-space-between width-100">
        <Button btnStyle="secondary"
                onClick={() => onClose()}>Abbrechen</Button>
        <Button onClick={() => onDelete()}>Löschen</Button>
      </div>
    </Modal>
  );
};

export default ModalConfirmDelete;
