import {useParams, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {observer} from "mobx-react";
import {MdDelete} from "react-icons/md";
import {FiPlus} from "react-icons/fi";
import globalStore from "../stores/global-store";
import classes from "./Admin.module.scss";
import {TEssen} from "../interfaces/Types";
import {IEssen, INotiz, IParty} from "../interfaces/IParty";
import ModalPassword from "../components/modalPassword";
import Button from "../ui-components/Button";
import userStore from "../stores/user-store";
import ButtonCircle from "../ui-components/Button-Circle";


const Admin = (): JSX.Element => {
  const {
    partyCollection,
    updatePartyBackend,
    loeschePartyBackend,
    throwPopupMessage,
  } = globalStore;

  const {isAdmin} = userStore;

  const params = useParams();
  const {id} = params;
  const navigate = useNavigate();

  const partyFind: IParty | undefined = partyCollection.find((part) => part.id === id);

  const [partyName, setPartyName] = useState(partyFind?.partyName ?? "");
  const [ort, setOrt] = useState(partyFind?.ort ?? "");
  const [ortCoordinates, setOrtCoordinates] = useState(partyFind?.ortCoordinates ?? "");
  const [datum, setDatum] = useState(partyFind?.datum ?? "");
  const [zeit, setZeit] = useState(partyFind?.zeit ?? "");
  const [infos, setInfos] = useState(partyFind?.infos ?? "");
  const [essen, setEssen] = useState<IEssen[]>(partyFind?.essen ?? []);
  const [notizen, setNotizen] = useState<INotiz[]>(partyFind?.notizen ?? []);

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
        ortCoordinates,
        datum,
        zeit,
        infos,
        essen,
        notizen,
      });
      throwPopupMessage("Party gespeichert", "success");
    }
  }

  const handleAddNewChoice = () => {
    setEssen((prevState) => [...prevState,
      {
        kategorie: "",
        essenName: "",
        werBringts: "",
      },
    ]);
  };

  function loescheParty(): void {
    if (id) {
      loeschePartyBackend(id);
    }
    navigate("/");
  }


  return (
    <>
      {!isAdmin && <ModalPassword isOpen={true}
                                  closeable={false}/>}

      {isAdmin && <section className={classes.adminSection}>
          <input type="text"
                 placeholder="Party Name"
                 value={partyName}
                 onChange={(e) => setPartyName(e.target.value)}/>
          <input type="text"
                 placeholder="Ort"
                 value={ort}
                 onChange={(e) => setOrt(e.target.value)}/>
          <input type="text"
                 placeholder="Koordinaten oder Adresse"
                 value={ortCoordinates}
                 onChange={(e) => setOrtCoordinates(e.target.value)}/>
          <input type="date"
                 value={datum}
                 onChange={(e) => setDatum(e.target.value)}/>
          <input type="time"
                 value={zeit}
                 onChange={(e) => setZeit(e.target.value)}/>
          <textarea value={infos}
                    placeholder="Infos"
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

          <ButtonCircle
              onClick={handleAddNewChoice}
              icon={<FiPlus/>}
              btnStyle="primary"
              size="14px"/>

          <Button style={{backgroundColor: "red", fontSize: "1em", marginTop: "10px"}}
                  onClick={loescheParty}>
              Party löschen
          </Button>

          <Button style={{fontSize: "1em", marginTop: "10px"}}
                  onClick={saveParty}>
              Speichern
          </Button>

      </section>}

    </>
  );
};

export default observer(Admin);
