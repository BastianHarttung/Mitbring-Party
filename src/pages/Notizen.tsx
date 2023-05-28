import "./Notizen.module.scss";
import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import {useParams} from "react-router-dom";
import classes from "./Uebersicht.module.scss";
import {IPartyApp} from "../interfaces/IParty";
import {emptyParty} from "../mockup/testConstants";
import globalStore from "../stores/global-store";

const Notizen = () => {
  const {
    partyCollection,
    addTeilnehmer,
    speichereActiveId,
  } = globalStore;

  const params = useParams();
  const [party, setParty] = useState<IPartyApp>(addTeilnehmer(emptyParty));

  const partyFind = partyCollection.find((party) => party.id === params.id);

  useEffect(() => {
    if (params.id) {
      speichereActiveId(params.id);
    }
    setParty(partyFind ? addTeilnehmer(partyFind) : addTeilnehmer(emptyParty));
  }, [partyFind, addTeilnehmer, speichereActiveId, params.id]);

  return (
    <section className={classes.notizenSection}>
      <h3>Notizen zu {party.partyName}</h3>
    </section>
  );
};

export default observer(Notizen);
