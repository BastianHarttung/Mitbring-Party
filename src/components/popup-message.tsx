import React from "react";
import classes from "./popup-message.module.scss";
import {TPopupStyle} from "../interfaces/Types";
import ReactDom from "react-dom";

interface IErrorMessageProps {
  message: string;
  style?: TPopupStyle;
}

const PopupMessage = ({message, style}: IErrorMessageProps) => {

  const isSuccess = style === "success";
  const isWarning = style === "warning";
  const isError = style === "error";

  return (
    <>
      {ReactDom.createPortal(
        <div className={classes.messageContainer}>
          <div
            className={`${classes.messageBox} ${isSuccess ? classes.success : isWarning ? classes.warning : isError ? classes.error : ""}`}>
            {message}
          </div>
        </div>
        , document.getElementById("popup-root") as HTMLElement)}
    </>
  );
};

export default PopupMessage;
