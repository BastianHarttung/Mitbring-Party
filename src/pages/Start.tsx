import classes from "./Start.module.scss";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import { FaRegEdit } from "react-icons/fa";
import {FiPlus} from "react-icons/fi";
import {datumZuLocalString, hashPassword, isPartyLocked} from "../helper-functions/helper-functions";
import {Party} from "../models/party";
import globalStore from "../stores/global-store";
import userStore from "../stores/user-store";
import Button from "../ui-components/Button";
import Loading from "../ui-components/Loading";


const Start = (): JSX.Element => {

  const {
    partyCollection,
    isLoading,
    speichereActiveId,
    speichereParty,
    throwPopupMessage,
  } = globalStore;

  const {isAdmin} = userStore;

  const [isNewParty, setIsNewParty] = useState(false);

  const [partyName, setPartyName] = useState("");
  const [ort, setOrt] = useState("");
  const [datum, setDatum] = useState("");
  const [zeit, setZeit] = useState("");
  const [info, setInfo] = useState("");
  const [passwort, setPasswort] = useState("");

  async function partySpeichern() {
    if (partyName) {
      const neueParty = new Party(partyName, ort, datum, zeit, info);
      if (passwort.trim() !== "") {
        try {
          neueParty.passwortHash = await hashPassword(passwort);
        } catch (error) {
          console.log(error);
          throwPopupMessage("Passwort konnte nicht gespeichert werden", "error");
          return;
        }
      }
      speichereParty(neueParty);
      inputFelderLoeschen();
      setIsNewParty(false);
    } else {
      throwPopupMessage("Mindestens Party Name eingeben!", "error");
    }
  }

  function inputFelderLoeschen() {
    setPartyName("");
    setOrt("");
    setDatum("");
    setZeit("");
    setInfo("");
    setPasswort("");
  }

  const isGone = (datum: string) => {
    return datum < new Date().toISOString().split("T")[0];
  };

  const handleNewPartyClick = () => {
    if (isAdmin) {
      setIsNewParty(!isNewParty);
    } else {
      throwPopupMessage("Du musst Admin sein um eine neue Party anzulegen!", "error");
    }
  };


  // Nach dem Edit-Enddatum sieht nur noch der Admin die Party
  const sichtbarePartys = partyCollection.filter((party) => isAdmin || !isPartyLocked(party));

  if (isLoading) {
    return <Loading/>
  }

  return (
    <section className={classes.startSection}>

      <h3>Mitbringparty:</h3>

      <div className={classes.partyCollectionContainer}>
        {sichtbarePartys.map((party) => (
            <div key={party.id}
                 className={`${classes.partyContainer} ${isGone(party.datum) ? classes.gone : ""}`}>
              <Link to={"/party/" + party.id}
                    onClick={() => speichereActiveId(party.id)}
                    className={classes.partyBox}>
                <div className={classes.partyName_container}>
                  <div className={classes.date}>
                    {datumZuLocalString(party.datum)}
                    {isPartyLocked(party) && <span className={classes.gesperrt}> · gesperrt</span>}
                  </div>
                  <div className={classes.partyName}>{party.partyName}</div>
                </div>
              </Link>
              <Link to={"admin/" + party.id}
                    className={classes.editLink}>
                <FaRegEdit size={24}/>
              </Link>
            </div>
          ),
        )}
      </div>

      <Button onClick={handleNewPartyClick}
              btnStyle={!isNewParty ? "primary" : "secondary"}
              frontIcon={!isNewParty ? <FiPlus style={{fontSize: "20px"}}/> : undefined}>
        {isNewParty ? "Abbrechen" : "Neue Party"}
      </Button>

      {(isNewParty && isAdmin) && <div className={classes.newPartyContainer}>
          <input type="text"
                 placeholder="Party Name"
                 value={partyName}
                 onChange={(e) => setPartyName(e.target.value)}/>
          <input type="text"
                 placeholder="Ort"
                 value={ort}
                 onChange={(e) => setOrt(e.target.value)}/>
          <input type="date"
                 placeholder="Datum"
                 value={datum}
                 onChange={(e) => setDatum(e.target.value)}/>
          <input type="time"
                 placeholder="Zeit"
                 value={zeit}
                 onChange={(e) => setZeit(e.target.value)}/>
          <textarea placeholder="Infos"
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}/>
          <input type="text"
                 autoComplete="off"
                 placeholder="Passwort (optional)"
                 value={passwort}
                 onChange={(e) => setPasswort(e.target.value)}/>
          <Button onClick={partySpeichern}>
              Speichern
          </Button>
      </div>}

    </section>
  );
};

export default observer(Start);
