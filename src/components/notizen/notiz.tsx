import classes from "./notiz.module.scss";
import {INotiz} from "../../interfaces/IParty";


interface NotizProps {
  notiz: INotiz
}

const Notiz = ({notiz}: NotizProps) => {
  return (
    <div className={classes.notiz_container}>
      <div className={`${classes.notiz_header} flex-row gap-2`}>
        <div className={classes.notiz_name}>{notiz.name}</div>
        <div className={classes.notiz_datum}>{notiz.datum.split("T")[0]}</div>
      </div>
      <div className="trennlinie"/>
      <div>{notiz.beschreibung}</div>
    </div>
  );
};

export default Notiz;
