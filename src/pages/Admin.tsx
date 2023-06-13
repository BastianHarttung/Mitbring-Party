import classes from "./Admin.module.scss";
import React, { ChangeEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { FiPlus } from "react-icons/fi";
import globalStore from "../stores/global-store";
import userStore from "../stores/user-store";
import { TEssen } from "../interfaces/Types";
import { IEssen, IParty } from "../interfaces/IParty";
import ModalPassword from "../components/modals/modalPassword";
import ModalConfirmDelete from "../components/modals/modalConfirmDelete";
import FoodRow from "../components/admin/foodRow";
import NoParty from "../components/noParty";
import Button from "../ui-components/Button";
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

  const [partyName, setPartyName] = useState<string>(partyFind?.partyName ?? "");
  const [ort, setOrt] = useState<string>(partyFind?.ort ?? "");
  const [ortCoordinates, setOrtCoordinates] = useState<string>(partyFind?.ortCoordinates ?? "");
  const [datum, setDatum] = useState<string>(partyFind?.datum ?? "");
  const [zeit, setZeit] = useState<string>(partyFind?.zeit ?? "");
  const [infos, setInfos] = useState<string>(partyFind?.infos ?? "");
  const [essen, setEssen] = useState<IEssen[]>(partyFind?.essen ?? []);

  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);

  function handleChangeEssen(event: ChangeEvent<HTMLInputElement>, index: number, mod: TEssen): void {
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
        notizen: [],
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

  if (!partyFind) {
    return <NoParty/>
  }

  return (
    <>
      {!isAdmin && <ModalPassword isOpen={true}
                                  closeable={false}/>}
      {isModalConfirmDeleteOpen && <ModalConfirmDelete isOpen={isModalConfirmDeleteOpen}
                                                       onClose={() => setIsModalConfirmDeleteOpen(false)}
                                                       onDelete={loescheParty}/>}


      {(isAdmin && partyFind) &&
          <section className={classes.adminSection}>
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
            {essen.map((ess, index) => (
              <FoodRow key={index}
                       essen={ess}
                       index={index}
                       onChange={handleChangeEssen}
                       onDelete={loescheEssen}/>)
            )}

              <ButtonCircle
                  onClick={handleAddNewChoice}
                  icon={<FiPlus/>}
                  btnStyle="primary"
                  size="14px"/>

              <Button style={{backgroundColor: "red", fontSize: "1em", marginTop: "10px"}}
                      onClick={() => setIsModalConfirmDeleteOpen(true)}>
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
