import classes from "./Modal.module.scss";
import React from "react";
import ReactDom from "react-dom";
import {IoMdClose} from "react-icons/io";


interface ModalProps {
  children?: JSX.Element | string;
  isOpen: boolean;
  closeable?: boolean;
  onClose: () => void;
  heading?: string;
}

const Modal = ({children, isOpen, closeable = true, onClose, heading}: ModalProps) => {

  const handleClose = () => {
    if (closeable) onClose()
  }

  return (
    <>
      {isOpen && ReactDom.createPortal(
        <div className={classes.modal}
             onClick={handleClose}>
          <div className={classes.inputContainer}
               onClick={(event) => event.stopPropagation()}>

            <div className={classes.modal_head}>
              <div className={classes.heading}>{heading}</div>
              {closeable && (
                <div className={classes.close_btn}>
                  <IoMdClose size={24}
                             onClick={onClose}/>
                </div>)}
            </div>

            {children}

          </div>
        </div>
        , document.getElementById("modal-root") as HTMLElement)}
    </>
  );
};

export default Modal;