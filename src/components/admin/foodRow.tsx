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
             value={essen.essenName}
             onChange={(event) => onChange(event, index, "essenName")}/>
      <input type="text"
             value={essen.werBringts}
             onChange={(event) => onChange(event, index, "werBringts")}/>
      <MdDelete onClick={() => onDelete(essen)}/>
    </div>
  );
};

export default FoodRow;
