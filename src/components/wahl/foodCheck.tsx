import classes from "./foodCheck.module.scss";
import React, { ChangeEvent } from "react";
import { IEssen } from "../../interfaces/IParty";


interface FoodCheckProps {
  essen: IEssen;
  onChecked: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FoodCheck = ({essen, onChecked}: FoodCheckProps) => {
  return (
    <div className={classes.checkbox}>
      <div className={classes.checkboxName}>
        <input type="checkbox"
               id={essen.essenName}
               name={essen.essenName}
               value={essen.essenName}
               onChange={onChecked}
               disabled={!!essen.werBringts}/>
        <label htmlFor={essen.essenName}>{essen.essenName}</label>
      </div>
      {essen.werBringts && <div className={classes.werBringts}><i>({essen.werBringts})</i></div>}
    </div>
  );
};

export default FoodCheck;
