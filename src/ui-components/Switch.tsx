import classes from "./Switch.module.scss";
import {useEffect, useState} from "react";


interface SwitchProps {
  onIsActive: () => void;
  onDeactivate: () => void;
  initialState?: boolean
}

const Switch = ({initialState = false, onIsActive, onDeactivate}: SwitchProps) => {
  const [isActive, setActive] = useState(initialState);

  useEffect(() => {
    if (isActive) {
      onIsActive()
    } else if (!isActive) {
      onDeactivate()
    }
  }, [isActive, onIsActive, onDeactivate]);


  return (
    <div className={`${classes.switch} ${isActive ? classes.active : ""}`}
         onClick={() => setActive((prevState) => !prevState)}>
      <div className={`${classes.switch_button} ${isActive ? classes.active : ""}`}/>
      <div className={classes.help_text}>
        <div className={`${classes.on}`}>AN</div>
        <div className={`${classes.off}`}>AUS</div>
      </div>
    </div>
  );
};

export default Switch;
