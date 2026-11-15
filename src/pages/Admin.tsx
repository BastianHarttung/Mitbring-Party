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
import { datumZuLocalString, hashPassword, standardEditEndDatum } from "../helper-functions/helper-functions";


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
  // Leer = Standard (1 Woche nach Party-Datum), passt sich also an, wenn das Datum geändert wird
  const [editEndDatum, setEditEndDatum] = useState<string>(partyFind?.editEndDatum ?? "");
  const [infos, setInfos] = useState<string>(partyFind?.infos ?? "");
  const [essen, setEssen] = useState<IEssen[]>(() => (partyFind?.essen ?? []).map((ess) => ({...ess})));
  // Stand beim Öffnen: zeigt beim Speichern, welche "Wer bringt's" der Admin selbst geändert hat
  const [originalEssen, setOriginalEssen] = useState<IEssen[]>(() => (partyFind?.essen ?? []).map((ess) => ({...ess})));
  // Gespeichert wird nur der Hash. Neues Passwort im Klartext; leer = bisheriges Passwort bleibt
  const [neuesPasswort, setNeuesPasswort] = useState<string>("");
  const [isPasswortEntfernt, setIsPasswortEntfernt] = useState<boolean>(false);
  const hatPasswort = !!partyFind?.passwortHash && !isPasswortEntfernt;

  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);

  function handleChangeEssen(event: ChangeEvent<HTMLInputElement>, index: number, mod: TEssen): void {
    const neuesEssen = [...essen];
    neuesEssen[index] = {...neuesEssen[index], [mod]: event.target.value};
    setEssen(neuesEssen);
  }

  function loescheEssen(esse: IEssen): void {
    const neu = essen.filter((ess: IEssen) => ess.essenName !== esse.essenName);
    setEssen(neu);
  }

  async function saveParty(): Promise<void> {
    if (id !== undefined) {
      let passwortHash: string | undefined = isPasswortEntfernt ? undefined : partyFind?.passwortHash;
      if (neuesPasswort.trim() !== "") {
        try {
          passwortHash = await hashPassword(neuesPasswort);
        } catch (error) {
          console.log(error);
          throwPopupMessage("Passwort konnte nicht gespeichert werden", "error");
          return;
        }
      }
      const gespeichert = await updatePartyBackend({
        id,
        partyName,
        ort,
        ortCoordinates,
        datum,
        zeit,
        ...(editEndDatum ? {editEndDatum} : {}),
        ...(passwortHash ? {passwortHash} : {}),
        infos,
        essen,
        notizen: partyFind?.notizen ?? [],
      }, originalEssen);
      if (!gespeichert) return;
      // Formular auf den gespeicherten Stand bringen (inkl. "Wer bringt's", das andere inzwischen eingetragen haben)
      const gespeicherteEssen = globalStore.partyCollection.find((part) => part.id === id)?.essen ?? essen;
      setEssen(gespeicherteEssen.map((ess) => ({...ess})));
      setOriginalEssen(gespeicherteEssen.map((ess) => ({...ess})));
      setNeuesPasswort("");
      setIsPasswortEntfernt(false);
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
              <div className={classes.editEndContainer}>
                  <span>Bearbeitbar bis (einschließlich):</span>
                  <div className={classes.editEndRow}>
                      <input type="date"
                             value={editEndDatum}
                             onChange={(e) => setEditEndDatum(e.target.value)}/>
                    {editEndDatum &&
                        <Button btnStyle="secondary"
                                style={{fontSize: "0.9em"}}
                                onClick={() => setEditEndDatum("")}>
                            Standard
                        </Button>}
                  </div>
                  <small>
                    {editEndDatum
                      ? "Danach sieht nur noch der Admin die Party."
                      : standardEditEndDatum(datum)
                        ? `Standard: 1 Woche nach der Party (${datumZuLocalString(standardEditEndDatum(datum))}). Danach sieht nur noch der Admin die Party.`
                        : "Standard: 1 Woche nach der Party. Ohne Party-Datum gibt es kein Ende."}
                  </small>
              </div>
              <div className={classes.editEndContainer}>
                  <span>Passwort (optional):</span>
                  <div className={classes.editEndRow}>
                      <input type="text"
                             autoComplete="off"
                             placeholder={hatPasswort ? "Neues Passwort" : "Kein Passwort"}
                             value={neuesPasswort}
                             onChange={(e) => setNeuesPasswort(e.target.value)}/>
                    {(hatPasswort || neuesPasswort) &&
                        <Button btnStyle="secondary"
                                style={{fontSize: "0.9em"}}
                                onClick={() => {
                                  setNeuesPasswort("");
                                  setIsPasswortEntfernt(true);
                                }}>
                            Entfernen
                        </Button>}
                  </div>
                  <small>
                    {neuesPasswort
                      ? "Nach dem Speichern brauchen alle das neue Passwort, das alte gilt nicht mehr."
                      : hatPasswort
                        ? "Die Party ist passwortgeschützt. Leer lassen, um das Passwort zu behalten."
                        : isPasswortEntfernt
                          ? "Das Passwort wird beim Speichern entfernt."
                          : "Ohne Passwort kann jeder mit dem Link die Party öffnen."}
                  </small>
              </div>
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
