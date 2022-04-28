import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {MdDelete} from "react-icons/md";
import globalStore from "../stores/global-store";
import classes from "./Admin.module.scss";

const Admin = () => {
  const {partyCollection, updateParty} = globalStore;

  const partyId = useParams();
  const navigate = useNavigate();
  const partyFind = partyCollection.find((part) => part.id.toString() === partyId.id);

  const handleInitialState = (state, type = "string") => {
    if (partyFind) return partyFind[state];
    else if (type === "array") return [];
    else return "";
  };

  const [partyName, setPartyName] = useState(handleInitialState("partyName"));
  const [ort, setOrt] = useState(handleInitialState("ort"));
  const [datum, setDatum] = useState(handleInitialState("datum"));
  const [infos, setInfos] = useState(handleInitialState("infos"));

  const [essen, setEssen] = useState(handleInitialState("essen", "array"));

  const handleChangeEssen = (event, index, mod) => {
    const neuesEssenArray = essen;
    const modEssen = neuesEssenArray[index];
    modEssen[mod] = event.target.value;
    setEssen([...neuesEssenArray]);
  };

  const loescheEssen = (esse) => {
    const neu = essen.filter((ess) => ess.essenName !== esse.essenName);
    setEssen(neu);
  };

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
              onClick={() => updateParty(partyId)}>
        Speichern
      </button>

    </section>
  );
};

export default Admin;