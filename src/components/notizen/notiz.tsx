import {INotiz} from "../../interfaces/IParty";


interface NotizProps {
  notiz: INotiz
}

const Notiz = ({notiz}: NotizProps) => {
  return (
    <div>
      {notiz.beschreibung}
    </div>
  );
};

export default Notiz;
