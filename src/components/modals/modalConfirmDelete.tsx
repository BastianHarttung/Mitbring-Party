import React from 'react';
import Modal from "../../ui-components/Modal";
import Button from "../../ui-components/Button";


interface ModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  heading?: string;
}

const ModalConfirmDelete = ({isOpen, onClose, onDelete, heading}: ModalConfirmDeleteProps) => {

  return (
    <Modal isOpen={isOpen}
           onClose={() => onClose()}
           closeable
           heading={heading ?? "Party wirklich löschen?"}>
      <div className="flex-row justify-space-between width-100">
        <Button btnStyle="secondary"
                onClick={() => onClose()}>Abbrechen</Button>
        <Button onClick={() => onDelete()}>Löschen</Button>
      </div>
    </Modal>
  );
};

export default ModalConfirmDelete;
