import classes from "./notiz.module.scss";
import {INotiz} from "../../interfaces/IParty";
import {MdDelete} from "react-icons/md";
import React from "react";
import userStore from "../../stores/user-store";


interface NotizProps {
  notiz: INotiz
  onDelete: (note: INotiz) => void;
}

const Notiz = ({notiz, onDelete}: NotizProps) => {

  const {isAdmin, userName} = userStore

  const canDelete = isAdmin || userName === notiz.name


  return (
    <div className={classes.notiz_container}>
      <div className={`${classes.notiz_header} flex-row gap-2`}>
        <div className={classes.notiz_name}>{notiz.name}</div>
        <div className={classes.notiz_datum}>{notiz.datum.split("T")[0]}</div>
      </div>
      <div className="trennlinie"/>
      <div>
        <div>{notiz.beschreibung}</div>
        {canDelete && <MdDelete onClick={() => onDelete(notiz)}/>}
      </div>
    </div>
  );
};

export default Notiz;