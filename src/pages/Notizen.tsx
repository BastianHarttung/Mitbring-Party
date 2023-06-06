import classes from "./Notizen.module.scss";
import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {useParams} from "react-router-dom";
import {FiPlus} from "react-icons/fi";
import {INotiz, IParty} from "../interfaces/IParty";
import {emptyParty} from "../mockup/testConstants";
import globalStore from "../stores/global-store";
import ButtonCircle from "../ui-components/Button-Circle";
import ModalNewNote from "../components/modalNewNote";
import Loading from "../ui-components/Loading";
import Notiz from "../components/notizen/notiz";


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
                 notiz={notiz}/>
        )}
      </div>

    </section>
  );
};

export default observer(Notizen);
