import classes from "./Wahl.module.scss";
import {useState, useEffect} from "react";
import React from "react";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react";
import {FiPlus} from "react-icons/fi";
import {Essen} from "../models/party";
import globalStore from "../stores/global-store";
import PicArrowDown from "../assets/img/icons/caret-down.svg";
import PicArrowUp from "../assets/img/icons/caret-up.svg";
import {emptyParty} from "../mockup/testConstants";
import {IParty, IEssen} from "../interfaces/IParty";
import Button from "../ui-components/Button";
import ButtonCircle from "../ui-components/Button-Circle";

const Wahl = () => {

  const {
    partyCollection,
    speichereActiveId,
    speichereEssen,
    speichereAuswahl,
    datumZuLocalString,
    throwErrorMessage,
  } = globalStore;

  const params = useParams();
  const partyFind = partyCollection.find((part) => part.id.toString() === params.id);

  const [party, setParty] = useState<IParty>(emptyParty);

  const [neuesEssenEingabe, setNeuesEssenEingabe] = useState(false);
  const [neueKategorie, setNeueKategorie] = useState("");
  const [neuesEssen, setNeuesEssen] = useState("");
  const [neuerName, setNeuerName] = useState("");
  const [checkedEssen, setCheckedEssen] = useState<string[]>([]);

  const [auswahlGespeichert, setAuswahlGespeichert] = useState(false);
  const [ausfuellen, setAusfuellen] = useState(false);

  const [openOrt, setOpenOrt] = useState(false);

  const handleNeuesEssenClick = () => {
    setAusfuellen(false);
    setNeuesEssenEingabe(!neuesEssenEingabe);
  }

  useEffect(() => {
    if (params.id) {
      speichereActiveId(params.id);
    }
    setParty(partyFind ? partyFind : emptyParty);
  }, [partyFind, params.id, speichereActiveId]);


  return (
    <section>
      <h3 className={classes.partyName}>{party.partyName}</h3>

      <div className={classes.datumContainer}><b>Datum:</b><br/>
        <div id="datum" className="datum">{datumZuLocalString(party.datum)}</div>
      </div>

      <div className={classes.zeitContainer}><b>Zeit:</b><br/>
        <div id="zeit" className="zeit">{party.zeit} Uhr</div>
      </div>

      <div className={classes.ortContainer}>
        <details onClick={() => setOpenOrt(!openOrt)}>
          <summary className={classes.ortText}>
            <div><b>Ort:</b></div>
            <div className={classes.ortArrowContainer}>
              <div id="ort" className={classes.ort}>{party.ort}</div>
              <img src={openOrt ? PicArrowUp : PicArrowDown} alt="open"/>
            </div>
          </summary>
          <iframe
            width="290"
            height="250"
            title={party.ort}
            style={{border: 0}}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_Key}&q=${party.ortCoordinates ? party.ortCoordinates : party.ort}`}>
          </iframe>
        </details>
      </div>

      <div className={classes.infosContainer}><b>Infos:</b><br/>
        <textarea id="infos"
                  value={party.infos}
                  rows={7}
                  readOnly/>
      </div>

      <div id="checkbox-container" className={classes.checkboxContainer}>
        {party.essen.map((ess, index) => {
          return <div key={index} className={classes.checkbox}>
            <div className={classes.checkboxName}>
              <input type="checkbox"
                     id={ess.essenName}
                     name={ess.essenName}
                     value={ess.essenName}
                     onChange={(evt) => handleChecked(evt)}
                     disabled={!!ess.werBringts}/>
              <label htmlFor={ess.essenName}>{ess.essenName}</label>
            </div>
            {ess.werBringts && <div className={classes.werBringts}><i>({ess.werBringts})</i></div>}
          </div>;
        })}
      </div>

      <div id="essenBtnContainer"
           className={classes.essenBtnContainer}>
        <ButtonCircle
          onClick={handleNeuesEssenClick}
          icon={<FiPlus/>}
          btnStyle="primary"
          size="18px"/>
      </div>

      {/*{neuesEssenEingabe && <div className={classes.neuesEssenContainer}>*/}
      {/*    <input type="text"*/}
      {/*           placeholder="Essen"*/}
      {/*           onChange={evt => setNeuesEssen(evt.target.value)}/>*/}
      {/*    <input type="datalist"*/}
      {/*           list="kategorie"*/}
      {/*           placeholder="Kategorie zB. Salate"*/}
      {/*           onChange={evt => setNeueKategorie(evt.target.value)}/>*/}
      {/*    <datalist id="kategorie">*/}
      {/*      {findKategorien().map((kategorie, index) => <option key={index} value={kategorie}/>)*/}
      {/*      }*/}
      {/*    </datalist>*/}

      {/*    <Button onClick={() => essenHinzufuegen(neuesEssen, neueKategorie, neuerName)}>*/}
      {/*        Essen hinzufügen*/}
      {/*    </Button>*/}

      {/*  {ausfuellen ? <div className={classes.ausfuellen}>Bitte vollständig ausfüllen!</div> : ""}*/}

      {/*</div>}*/}

      <div className={classes.nameSpeichernContainer}>
        <Button onClick={auswahlSpeichern}>
          Auswahl speichern
        </Button>
        {auswahlGespeichert ? <div className={classes.auswahlGespeichert}>Auswahl gespeichert</div> : ""}
      </div>

    </section>
  );


  /**
   * Finde und filtere Kategorien
   * @return {*[]} gibt ein Array zurück, dass einmalige Kategorien enthält gefunden in der party
   */
  function findKategorien(): string[] {
    const vorhandeneKategorienArray = party.essen.map((essen) => {
      return essen.kategorie;
    }, []);
    const kategorieArray = [...vorhandeneKategorienArray, "Sonstiges"]
    return kategorieArray.filter((item, index) => kategorieArray.indexOf(item) === index);
  }

  function essenHinzufuegen(neuesEssen: string, neueKategorie: string, neuerName: string) {
    if (neuesEssen && neueKategorie) {
      setAusfuellen(false);
      const essen: IEssen = new Essen(neueKategorie, neuesEssen, neuerName);
      speichereEssen(params.id, essen);
      loescheInputFelder();
      setNeuesEssenEingabe(false);
    } else {
      setAusfuellen(true);
    }
  }

  function loescheInputFelder() {
    setNeuesEssen("");
    setNeueKategorie("");
    setNeuerName("");
  }

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    let newChecked = checkedEssen;
    if (checked) {
      // Add essen to array
      newChecked.push(event.target.value);
    } else {
      //Delete essen from array
      for (let i = 0; i < newChecked.length; i++) {
        if (newChecked[i] === event.target.value) {
          newChecked.splice(i, 1);
        }
      }
    }
    setCheckedEssen(newChecked);
  }

  function auswahlSpeichern() {
    if (!!neuerName) {
      speichereAuswahl(checkedEssen, neuerName, party);
      //Alle Checkboxen unchecken
      setCheckedEssen([]);
      //Anzeige dass Auswahl gespeichert wurde
      setAuswahlGespeichert(true);
      setTimeout(() => setAuswahlGespeichert(false), 2500);
    } else {
      throwErrorMessage("Name eingeben!");
    }
  }

};

export default observer(Wahl);