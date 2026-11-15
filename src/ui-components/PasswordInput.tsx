import classes from "./PasswordInput.module.scss";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";


interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

/** Passwortfeld, dessen Inhalt über ein Auge-Symbol sichtbar gemacht werden kann */
const PasswordInput = ({value, onChange, onKeyDown, placeholder = "Passwort", autoFocus}: PasswordInputProps) => {

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={classes.passwordInput}>
      <input type={isVisible ? "text" : "password"}
             value={value}
             placeholder={placeholder}
             autoFocus={autoFocus}
             autoComplete="off"
             onChange={e => onChange(e.target.value)}
             onKeyDown={onKeyDown}/>
      <button type="button"
              className={classes.eyeBtn}
              onClick={() => setIsVisible(!isVisible)}
              aria-label={isVisible ? "Passwort verbergen" : "Passwort anzeigen"}
              title={isVisible ? "Passwort verbergen" : "Passwort anzeigen"}>
        {isVisible ? <FiEyeOff size={18}/> : <FiEye size={18}/>}
      </button>
    </div>
  );
};

export default PasswordInput;
