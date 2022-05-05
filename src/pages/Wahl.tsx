import classes from "./Wahl.module.scss";
import {useState, useEffect} from "react";
import React from "react";
import {Essen} from "../models/party";
import {useParams} from "react-router-dom";
import globalStore from "../stores/global-store";
import {observer} from "mobx-react";
import PicArrowDown from "../assets/img/icons/caret-down.svg";
import {emptyParty} from "../mockup/testConstants";
import {IParty, IEssen} from "../interfaces/IParty";

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
  // const navigate = useNavigate();
  const partyFind = partyCollection.find((part) => part.id.toString() === params.id);

  const [party, setParty] = useState<IParty>(emptyParty);

  const [neuesEssenEingabe, setNeuesEssenEingabe] = useState(false);
  const [neueKategorie, setNeueKategorie] = useState("");
  const [neuesEssen, setNeuesEssen] = useState("");
  const [neuerName, setNeuerName] = useState("");
  const [checkedEssen, setCheckedEssen] = useState<string[]>([]);

  const [auswahlGespeichert, setAuswahlGespeichert] = useState(false);
  const [ausfuellen, setAusfuellen] = useState(false);

  useEffect(() => {
    if (params.id) {
      speichereActiveId(params.id);
    }
    setParty(partyFind ? partyFind : emptyParty);
  }, [partyFind]);


  return (
    <section className={classes.wahlSection}>
      <h3 className={classes.partyName}>{party.partyName}</h3>

      <div className={classes.datumContainer}><b>Datum:</b><br/>
        <div id="datum" className="datum">{datumZuLocalString(party.datum)}</div>
      </div>

      <div className={classes.ortContainer}>
        <details>
          <summary className={classes.ortText}>
            <div><b>Ort:</b></div>
            <div className={classes.ortArrowContainer}>
              <div id="ort" className={classes.ort}>{party.ort}</div>
              <img src={PicArrowDown} alt="open"/>
            </div>
          </summary>
          <iframe
            width="250"
            height="250"
            title={party.ort}
            style={{border: 0}}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_Key}&q=${party.ort}`}>
          </iframe>
        </details>
      </div>

      <div className={classes.infosContainer}><b>Infos:</b><br/>
        <div id="infos" className="infos">{party.infos}</div>
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

      <div id="essenBtnContainer">
        <button id="essenBtn"
                onClick={() => {
                  setAusfuellen(false);
                  setNeuesEssenEingabe(!neuesEssenEingabe);
                }}>{neuesEssenEingabe ? "Abbrechen" : "Neues Essen"}</button>
      </div>

      {neuesEssenEingabe && <div className={classes.neuesEssenContainer}>
        <input type="text"
               placeholder="Essen"
               onChange={evt => setNeuesEssen(evt.target.value)}/>
        <input type="datalist"
               list="kategorie"
               placeholder="Kategorie zB. Salate"
               onChange={evt => setNeueKategorie(evt.target.value)}/>
        <datalist id="kategorie">
          {findKategorien().map((kategorie, index) => <option key={index} value={kategorie}/>)
          }
        </datalist>

        <button onClick={() => essenHinzufuegen(neuesEssen, neueKategorie, neuerName)}>Essen hinzufügen</button>

        {ausfuellen ? <div className={classes.ausfuellen}>Bitte vollständig ausfüllen!</div> : ""}

      </div>}

      <div className={classes.nameSpeichernContainer}>
        <input id="name"
               type="text"
               name="Name"
               placeholder="Dein Name"
               value={neuerName}
               onChange={evt => setNeuerName(evt.target.value)}/>
        <button onClick={auswahlSpeichern}
                className="speichernBtn">Auswahl speichern
        </button>
        {auswahlGespeichert ? <div className={classes.auswahlGespeichert}>Auswahl gespeichert</div> : ""}
      </div>

    </section>
  );


  /**
   * Finde und filtere Kategorien
   * @return {*[]} gibt ein Array zurück, dass einmalige Kategorien enthält gefunden in der party
   */
  function findKategorien(): string[] {
    const kategorieArray = party.essen.reduce((kategorien, actual) => {
      // @ts-ignore
      kategorien.push(actual.kategorie);
      return kategorien;
    }, []);
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