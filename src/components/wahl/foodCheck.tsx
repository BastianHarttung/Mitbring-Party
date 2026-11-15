import classes from "./foodCheck.module.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IEssen } from "../../interfaces/IParty";
import userStore from "../../stores/user-store";


interface FoodCheckProps {
  essen: IEssen;
  onChecked: (event: ChangeEvent<HTMLInputElement>) => void;
  checkedEssen: string[];
  readOnly?: boolean;
}

const FoodCheck = ({essen, onChecked, checkedEssen, readOnly = false}: FoodCheckProps) => {
  const {userName} = userStore;

  const [isChecked, setIsChecked] = useState(false);

  const userHasChecked = essen.werBringts === userName;

  const isVergeben = !!essen.werBringts && !userHasChecked
  const isDisabled = isVergeben || readOnly
  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    onChecked(event);
    setIsChecked(prevState => !prevState);
  };

  useEffect(() => {
    setIsChecked(checkedEssen.includes(essen.essenName))
  }, [checkedEssen, essen.essenName]);


  return (
    <div
      className={`${classes.checkbox} ${userHasChecked ? classes.checkbox_userChecked : !isDisabled ? classes.checkbox_checkable : ""}`}>
      <div className={classes.checkboxName}>
        <input type="checkbox"
               id={essen.essenName}
               name={essen.essenName}
               value={essen.essenName}
               onChange={handleCheck}
               checked={isChecked}
               disabled={isDisabled}/>
        <label htmlFor={essen.essenName}
               className={isVergeben ? classes.food_disabled : ""}>{essen.essenName}</label>
      </div>
      {essen.werBringts && <div className={classes.werBringts}><i>({essen.werBringts})</i></div>}
    </div>
  );
};

export default FoodCheck;
