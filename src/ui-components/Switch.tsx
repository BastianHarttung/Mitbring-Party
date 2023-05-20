import classes from "./Switch.module.scss";
import {useEffect, useState} from "react";


interface SwitchProps {
  onIsActive: () => void;
  onDeactivate: () => void;
  initialState?: boolean;
  beforeActivate?: () => boolean;
}

const Switch = ({initialState = false, onIsActive, onDeactivate, beforeActivate}: SwitchProps) => {
  const [isActive, setActive] = useState(initialState);

  const handleClick = () => {
    const activate = beforeActivate ?? true
    if (activate) setActive((prevState) => !prevState)
  }

  useEffect(() => {
    if (isActive) {
      onIsActive()
    } else if (!isActive) {
      onDeactivate()
    }
  }, [isActive, onIsActive, onDeactivate]);


  return (
    <div className={`${classes.switch} ${isActive ? classes.active : ""}`}
         onClick={handleClick}>
      <div className={`${classes.switch_button} ${isActive ? classes.active : ""}`}/>
      <div className={classes.help_text}>
        <div className={`${classes.on}`}>AN</div>
        <div className={`${classes.off}`}>AUS</div>
      </div>
    </div>
  );
};

export default Switch;
