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
      <Button onClick={() => onDelete()}>Löschen</Button>
    </Modal>
  );
};

export default ModalConfirmDelete;
