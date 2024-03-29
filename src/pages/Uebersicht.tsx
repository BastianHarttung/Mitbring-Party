import classes from "./Uebersicht.module.scss";
import {useParams} from "react-router-dom";
import globalStore from "../stores/global-store";
import React, {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {emptyParty} from "../mockup/testConstants";
import {IPartyApp} from "../interfaces/IParty";
import NoParty from "../components/noParty";
import Loading from "../ui-components/Loading";

const Uebersicht = () => {
  const {
    partyCollection,
    isLoading,
    addTeilnehmer,
    speichereActiveId,
    speichereNotesCount,
  } = globalStore;

  const [party, setParty] = useState<IPartyApp>(addTeilnehmer(emptyParty));
  const params = useParams();

  const partyFind = partyCollection.find((party) => party.id === params.id);

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

  if (!partyFind) {
    return <NoParty/>
  }

  return (
    <section className={classes.uebersichtSection}>

      <h3>{party.partyName}</h3>

      <div className={classes.tableContainer}>
        <table id="table" className={classes.table}>
          <thead>
          <tr>
            <th className={classes.tableStart}></th>
            {party.teilnehmer.map((teiln, index) => {
              return <th id={"table-name" + index}
                         key={index}
                         className={classes.tableHead}>{teiln}</th>;
            })}
          </tr>
          </thead>

          <tbody id="table-eat" className={classes.table_eat}>
          {party.essen.map((essen, index) => {
            return <tr id={"tableRow" + index}
                       className={classes.tableRow}
                       key={index}>
              <td className={classes.trEat}>{essen.essenName}</td>
              {party.teilnehmer.map((teiln, indext) => {
                if (teiln === essen.werBringts) {
                  return <td key={indext} className={classes.trTrue}>ja</td>;
                } else {
                  return <td key={indext} className={classes.trFalse}>nein</td>;
                }
              })}
            </tr>;
          })}
          </tbody>

        </table>
      </div>
    </section>
  );
};

export default observer(Uebersicht);