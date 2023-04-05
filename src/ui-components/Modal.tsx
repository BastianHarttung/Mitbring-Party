import classes from "./Modal.module.scss";
import React, {useState} from "react";
import ReactDom from "react-dom";
import {IoMdClose} from "react-icons/io";


interface ModalProps {
  children: JSX.Element;
  isOpen?: boolean;
  closeable?: boolean;
}

const Modal = ({children, isOpen = false, closeable = true}: ModalProps) => {

  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  return (
    <>
      {isModalOpen && ReactDom.createPortal(
        <div className={classes.modal}>
          <div className={classes.inputContainer}>
            {closeable && <div className={classes.close_btn}>
                <IoMdClose size={24}
                           onClick={() => setIsModalOpen(false)}/>
            </div>}
            {children}
          </div>
        </div>
        , document.getElementById("modal-root") as HTMLElement)}
    </>
  );
};

export default Modal;