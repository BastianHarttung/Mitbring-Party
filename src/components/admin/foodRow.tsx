import React, {ChangeEvent} from 'react';
import classes from "../../pages/Admin.module.scss";
import {MdDelete} from "react-icons/md";
import {IEssen} from "../../interfaces/IParty";
import {TEssen} from "../../interfaces/Types";


interface FoodRowProps {
  essen: IEssen,
  index: number,
  onChange: (event: ChangeEvent<HTMLInputElement>, index: number, input: TEssen) => void;
  onDelete: (essen: IEssen) => void;
}

const FoodRow = ({essen, index, onChange, onDelete}: FoodRowProps) => {
  return (
    <div className={classes.essenContainer}>
      <input type="text"
             className={classes.essenName}
             value={essen.essenName}
             onChange={(event) => onChange(event, index, "essenName")}/>

      <div className={classes.input_second_row}>
        <input type="text"
               className={classes.kategorie}
               value={essen.kategorie}
               onChange={(event) => onChange(event, index, "kategorie")}/>
        <input type="text"
               className={classes.werBringts}
               value={essen.werBringts}
               onChange={(event) => onChange(event, index, "werBringts")}/>
        <MdDelete onClick={() => onDelete(essen)}/>
      </div>
    </div>
  );
};

export default FoodRow;
