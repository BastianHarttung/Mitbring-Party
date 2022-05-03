import classes from "./Uebersicht.module.scss";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import globalStore from "../stores/global-store";
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import {emptyParty} from "../mockup/testConstants";
import {IPartyApp} from "../interfaces/IParty";

const Uebersicht = () => {
  const {partyCollection, addTeilnehmer} = globalStore;

  const params = useParams();
  const navigate = useNavigate();
  const [party, setParty] = useState<IPartyApp>(emptyParty);

  useEffect(() => {
    const partyFind = partyCollection.find((party) => party.id === params.id);
    if (partyFind !== undefined) {
      setParty(addTeilnehmer(partyFind));
    } else {
      navigate("/wrong");
    }
  }, [partyCollection, params.id, addTeilnehmer]);

  return (
    <section className={classes.uebersichtSection}>
      <div className={classes.tableContainer}>
        <table id="table" className={classes.table}>

          <thead>
          <tr>
            <th className={classes.tableStart}>{party.partyName}</th>
            {party.teilnehmer.map((t, index) => {
              return <th id={"table-name" + index}
                         key={index}
                         className={classes.tableHead}>{t}</th>;
            })}
          </tr>
          </thead>

          <tbody id="table-eat">
          {party.essen.map((essen, index) => {
            return <tr id={"tableRow" + index}
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