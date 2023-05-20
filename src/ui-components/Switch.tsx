import classes from "./Switch.module.scss";
import {useEffect, useState} from "react";


interface SwitchProps {
  isActive?: boolean;
  onIsActive: () => void;
  onDeactivate: () => void;
}

const Switch = ({isActive = false, onIsActive, onDeactivate}: SwitchProps) => {
  const [isSwitchOn, setIsSwitchOn] = useState(isActive);

  const handleClick = () => {
    setIsSwitchOn((prevState) => !prevState)
  }

  useEffect(() => {
    if (isSwitchOn) {
      onIsActive()
    } else if (!isSwitchOn) {
      onDeactivate()
    }
  }, [isSwitchOn, onIsActive, onDeactivate]);

  useEffect(() => {
    if (isActive) {
      setIsSwitchOn(true)
    } else {
      setIsSwitchOn(false)
    }
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
