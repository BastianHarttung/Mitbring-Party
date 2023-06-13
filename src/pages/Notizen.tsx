import classes from "./Notizen.module.scss";
import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { INotiz, IParty } from "../interfaces/IParty";
import { emptyParty } from "../mockup/testConstants";
import globalStore from "../stores/global-store";
import ButtonCircle from "../ui-components/Button-Circle";
import ModalNewNote from "../components/modals/modalNewNote";
import Loading from "../ui-components/Loading";
import Notiz from "../components/notizen/notiz";
import ModalConfirmDelete from "../components/modals/modalConfirmDelete";


const Notizen = () => {
  const {
    partyCollection,
    isLoading,
    addTeilnehmer,
    speichereActiveId,
    speichereNotesCount,
    speichereNotiz,
    deleteNote,
  } = globalStore;

  const [isModalNewNoteOpen, setIsModalNewNoteOpen] = useState(false);
  const [modalConfirmDelete, setModalConfirmDelete] = useState<INotiz | null>(null);

  const params = useParams();
  const [party, setParty] = useState<IParty>(emptyParty);

  const partyFind = partyCollection.find((party) => party.id === params.id);

  const handleSaveNewNote = (note: INotiz) => {
    speichereNotiz(params.id, note)
    setIsModalNewNoteOpen(false)
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const handleDelete = () => {
    if (modalConfirmDelete) {
      deleteNote(params.id, modalConfirmDelete)
      setModalConfirmDelete(null)
    }
  }

  const handleClickDelete = (note: INotiz) => {
    setModalConfirmDelete(note)
  }

  useEffect(() => {
    if (params.id) {
      speichereActiveId(params.id);
      speichereNotesCount(partyFind?.notizen?.length ?? 0)
    }
    setParty(partyFind ? partyFind : emptyParty);
  }, [partyFind, addTeilnehmer, speichereActiveId, speichereNotesCount, params.id]);


  if (isLoading) {
    return <Loading/>
  }

  return (
    <section className={classes.notizenSection}>
      <ModalNewNote isOpen={isModalNewNoteOpen}
                    onClose={() => setIsModalNewNoteOpen(false)}
                    onSave={handleSaveNewNote}/>
      <ModalConfirmDelete isOpen={!!modalConfirmDelete}
                          onClose={() => setModalConfirmDelete(null)}
                          onDelete={handleDelete}
                          heading="Notiz wirklich löschen?"/>


      <div className="flex-center" style={{width: "100%"}}>
        <h3>Notizen zu {party.partyName}</h3>
        <ButtonCircle
          onClick={() => setIsModalNewNoteOpen(true)}
          icon={<FiPlus/>}
          btnStyle="primary"
          size="18px"/>
      </div>

      <div className={classes.notizen_container}>
        {party.notizen && party.notizen.map((notiz) =>
          <Notiz key={notiz.id}
                 notiz={notiz}
                 onDelete={handleClickDelete}/>
        )}
      </div>

    </section>
  );
};

export default observer(Notizen);
