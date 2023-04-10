import classes from "./modal.module.scss";
import React from 'react';
import Modal from "../ui-components/Modal";
import userStore from "../stores/user-store";
import Button from "../ui-components/Button";


interface IModalUserNameProps {
  isOpen: boolean
}

const ModalUserName = ({isOpen}: IModalUserNameProps) => {

  const {closeModalUserName} = userStore

  return (
    <Modal isOpen={isOpen}
           closeable={false}
           onClose={closeModalUserName}
           heading="Dein Name">

      <div className={classes.content_modal_username}>
        <p>Sag mir bitte deinen Namen. <br/>
          Keine Angst, es gibt keine Werbung und der Name wird auch nicht dauerhaft gespeichert.</p>
        <input type="text"
               placeholder="Name..."/>
        <Button onClick={() => console.log("save")}>Name speichern</Button>
      </div>

    </Modal>
  );
};

export default ModalUserName;
