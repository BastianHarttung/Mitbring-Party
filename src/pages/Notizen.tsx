import classes from "./Notizen.module.scss";
import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {useParams} from "react-router-dom";
import {FiPlus} from "react-icons/fi";
import {INotiz, IPartyApp} from "../interfaces/IParty";
import {emptyParty} from "../mockup/testConstants";
import globalStore from "../stores/global-store";
import ButtonCircle from "../ui-components/Button-Circle";
import ModalNewNote from "../components/modalNewNote";
import Loading from "../ui-components/Loading";


const Notizen = () => {
  const {
    partyCollection,
    isLoading,
    addTeilnehmer,
    speichereActiveId,
    speichereNotesCount,
    speichereNotiz,
  } = globalStore;

  const [isModalNewNoteOpen, setIsModalNewNoteOpen] = useState(false);

  const params = useParams();
  const [party, setParty] = useState<IPartyApp>(addTeilnehmer(emptyParty));

  const partyFind = partyCollection.find((party) => party.id === params.id);

  const handleSaveNewNote = (note: INotiz) => {
    console.log("save new note", note)
    speichereNotiz(params.id, note)
    setIsModalNewNoteOpen(false)
  }

  useEffect(() => {
    if (params.id) {
      speichereActiveId(params.id);
      speichereNotesCount(partyFind?.notizen?.length ?? 0)
    }
    setParty(partyFind ? addTeilnehmer(partyFind) : addTeilnehmer(emptyParty));
  }, [partyFind, addTeilnehmer, speichereActiveId, speichereNotesCount, params.id]);


  if (isLoading) {
    return <Loading/>
  }

  return (
    <section className={classes.notizenSection}>
      <ModalNewNote isOpen={isModalNewNoteOpen}
                    onClose={() => setIsModalNewNoteOpen(false)}
                    onSave={handleSaveNewNote}/>

      <h3>Notizen zu {party.partyName}</h3>

      {party.notizen && party.notizen.map((notiz) => <div>{notiz.beschreibung}</div>)}

      <ButtonCircle
        onClick={() => setIsModalNewNoteOpen(true)}
        icon={<FiPlus/>}
        btnStyle="primary"
        size="18px"/>
    </section>
  );
};

export default observer(Notizen);
