import React from "react";
import classes from "./error-message.module.scss";

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage = ({message}: IErrorMessageProps) => {

  return (
    <div className={classes.messageContainer}>
      <div className={classes.messageBox}>
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
