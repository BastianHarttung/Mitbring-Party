import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {MdDelete} from "react-icons/md";
import globalStore from "../stores/global-store";
import classes from "./Admin.module.scss";
import {TEssen} from "../interfaces/Types";
import {IEssen, IParty} from "../interfaces/IParty";
import ModalPassword from "../components/modalPassword";
import {observer} from "mobx-react";


const Admin = (): JSX.Element => {
  const {
    partyCollection,
    isAdmin,
    updatePartyBackend,
    loeschePartyBackend,
  } = globalStore;

  const params = useParams();
  const {id} = params;
  const navigate = useNavigate();

  const partyFind: IParty | undefined = partyCollection.find((part) => part.id === id);

  const [partyName, setPartyName] = useState("");
  const [ort, setOrt] = useState("");
  const [datum, setDatum] = useState("");
  const [zeit, setZeit] = useState("");
  const [infos, setInfos] = useState("");
  const [essen, setEssen] = useState<IEssen[]>([]);

  const [savedParty, setSavedParty] = useState(false);

  function mapPartyFindToAdminParty(id: string): IParty {
    const partyNam: string | undefined = partyCollection.find((part) => part.id === id)?.partyName;
    const partyOrt: string | undefined = partyCollection.find((part) => part.id === id)?.ort;
    const partyDatum: string | undefined = partyCollection.find((part) => part.id === id)?.datum;
    const partyZeit: string | undefined = partyCollection.find((part) => part.id === id)?.zeit;
    const partyInfos: string | undefined = partyCollection.find((part) => part.id === id)?.infos;
    const partyEssen: IEssen[] | undefined = partyCollection.find((part) => part.id === id)?.essen;

    let essenArray: IEssen[] = [];
    partyEssen?.forEach((ess) => essenArray.push({
      essenName: ess.essenName,
      kategorie: ess.kategorie,
      werBringts: ess.werBringts,
    }));
    return {
      id: id,
      partyName: partyNam ? partyNam : "",
      ort: partyOrt ? partyOrt : "",
      datum: partyDatum ? partyDatum : "",
      zeit: partyZeit ? partyZeit : "",
      infos: partyInfos ? partyInfos : "",
      essen: essenArray,
    };
  }

  function handleChangeEssen(event: any, index: number, mod: TEssen): void {
    let neuesEssen = [...essen];
    neuesEssen[index][mod] = event.target.value;
    setEssen(neuesEssen);
  }

  function loescheEssen(esse: IEssen): void {
    const neu = essen.filter((ess: IEssen) => ess.essenName !== esse.essenName);
    setEssen(neu);
  }

  function saveParty(): void {
    if (id !== undefined) {
      updatePartyBackend({
        id,
        partyName,
        ort,
        datum,
        zeit,
        infos,
        essen,
      });
      setSavedParty(true);
      setTimeout(() => setSavedParty(false), 3000);
    }
  }

  function loescheParty():void {
    if (id) {
      loeschePartyBackend(id);
    }
    navigate("/");
  }

  useEffect(() => {
    if (!partyFind || id === undefined) {
    } else {
      setPartyName(mapPartyFindToAdminParty(id).partyName);
      setOrt(mapPartyFindToAdminParty(id).ort);
      setDatum(mapPartyFindToAdminParty(id).datum);
      setZeit(mapPartyFindToAdminParty(id).zeit);
      setInfos(mapPartyFindToAdminParty(id).infos);
      setEssen(mapPartyFindToAdminParty(id).essen);
    }
  }, [partyFind]);

  return (
    <div>

      {!isAdmin && <ModalPassword/>}

      {isAdmin && <section className={classes.adminSection}>
        <input type="text"
               value={partyName}
               onChange={(e) => setPartyName(e.target.value)}/>
        <input type="text"
               value={ort}
               onChange={(e) => setOrt(e.target.value)}/>
        <input type="date"
               value={datum}
               onChange={(e) => setDatum(e.target.value)}/>
        <input type="time"
               value={zeit}
               onChange={(e) => setZeit(e.target.value)}/>
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

        <button style={{backgroundColor: "red", fontSize: "1em", marginTop: "10px"}}
                onClick={loescheParty}>
          Party löschen
        </button>

        <button style={{fontSize: "1em", marginTop: "10px"}}
                onClick={saveParty}>
          Speichern
        </button>

        {savedParty && <p style={{color: "red"}}>Party gespeichert</p>}

      </section>}

    </div>
  );
};

export default observer(Admin);