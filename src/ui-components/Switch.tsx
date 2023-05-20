import classes from "./Switch.module.scss";
import {useEffect, useState} from "react";


interface SwitchProps {
  isActive: boolean;
  onIsActive: () => void;
  onDeactivate: () => void;
}

const Switch = ({isActive, onIsActive, onDeactivate}: SwitchProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(isActive);

  const handleClick = () => {
    if (!isSwitchOn) {
      onIsActive()
    } else if (isSwitchOn) {
      onDeactivate()
      setIsSwitchOn(false)
    }
  }

  useEffect(() => {
    if (!isActive) setIsSwitchOn(false)
    if (isActive) setIsSwitchOn(true)
  }, [isActive]);


  return (
    <div className={`${classes.switch} ${isSwitchOn ? classes.active : ""}`}
         onClick={handleClick}>
      <div className={`${classes.switch_button} ${isSwitchOn ? classes.active : ""}`}/>
      <div className={classes.help_text}>
        <div className={`${classes.on}`}>AN</div>
        <div className={`${classes.off}`}>AUS</div>
      </div>
    </div>
  );
};

export default Switch;
