import React from "react";
import classes from "./popup-message.module.scss";
import { TPopupStyle } from "../interfaces/Types";

interface IErrorMessageProps {
  message: string;
  style?: TPopupStyle;
}

const PopupMessage = ({message, style}: IErrorMessageProps) => {

  const isSuccess = style === "success";
  const isWarning = style === "warning";
  const isError = style === "error";

  return (
    <div className={classes.messageContainer}>
      <div
        className={`${classes.messageBox} ${isSuccess ? classes.success : isWarning ? classes.warning : isError ? classes.error : ""}`}>
        {message}
      </div>
    </div>
  );
};

export default PopupMessage;
