import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {MdDelete} from "react-icons/md";
import globalStore from "../stores/global-store";
import classes from "./Admin.module.scss";
import {TState} from "../interfaces/Types";
import {TStateArray} from "../interfaces/Types";
import {IEssen} from "../interfaces/IParty";

const Admin = (): JSX.Element => {
  const {partyCollection, updatePartyBackend} = globalStore;

  const params = useParams();
  const {id} = params;
  const navigate = useNavigate();
  const partyFind = partyCollection.find((part) => part.id.toString() === id);

  const handleInitialStateString = (state: TState): string => {
    if (!!partyFind) return partyFind[state];
    else return "";
  };
  const handleInitialStateArray = (state: TStateArray): IEssen[] => {
    if (!!partyFind) return partyFind[state];
    else return [];
  };

  const [partyName, setPartyName] = useState(handleInitialStateString("partyName"));
  const [ort, setOrt] = useState(handleInitialStateString("ort"));
  const [datum, setDatum] = useState(handleInitialStateString("datum"));
  const [infos, setInfos] = useState(handleInitialStateString("infos"));

  const [essen, setEssen] = useState(handleInitialStateArray("essen"));

  const handleChangeEssen = (event: any, index: number, mod: string) => {
    const neu = essen;
    setEssen(neu);
  };

  const loescheEssen = (esse: IEssen) => {
    const neu = essen.filter((ess: IEssen) => ess.essenName !== esse.essenName);
    setEssen(neu);
  };

  const saveParty = () =>{
    if(id !== undefined){
      updatePartyBackend({
        id,
        partyName,
        ort,
        datum,
        infos,
        essen,
      })
    }
  }

  useEffect(() => {
    if (!partyFind) {
      navigate("/wrong");
    }
  }, []);

  return (
    <section className={classes.adminSection}>
      <input type="text"
             value={partyName}
             onChange={(e) => setPartyName(e.target.value)}/>
      <input type="text"
             value={ort}
             onChange={(e) => setOrt(e.target.value)}/>
      <input type="date"
             value={datum}
             onChange={(e) => setDatum(e.target.value)}/>
      <textarea value={infos}
                onChange={(e) => setInfos(e.target.value)}/>
      {essen.map((ess, index) => {
        return (
          <div key={index} className={classes.essenContainer}>
            <input type="text"
                   value={ess.essenName}
                   onChange={(event) => handleChangeEssen(event, index, "essenName")}/>
            <input type="text"
                   value={ess.werBringts}
                   onChange={(event) => handleChangeEssen(event, index, "werBringts")}/>
            <MdDelete onClick={() => loescheEssen(ess)}/>
          </div>
        );
      })}

      <button style={{fontSize: "1em", marginTop: "10px"}}
              onClick={saveParty}>
        Speichern
      </button>

    </section>
  );
};

export default Admin;