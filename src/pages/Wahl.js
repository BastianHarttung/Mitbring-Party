import classes from './Wahl.module.scss'
import {useState} from "react";
import {Essen} from "../models/party";
import {useParams} from "react-router-dom";


const Wahl = (props) => {

    //console.log(props.partyCollection)

    const partyId = useParams();
    const [party, setParty] = useState(props.partyCollection.find((part) => part.id.toString() === partyId.id))

    const [neuesEssenEingabe, setNeuesEssenEingabe] = useState(false)
    const [neueKategorie, setNeueKategorie] = useState('')
    const [neuesEssen, setNeuesEssen] = useState('')
    const [neuerName, setNeuerName] = useState('')
    const [checkedEssen, setCheckedEssen] = useState([])

    const [auswahlGespeichert, setAuswahlGespeichert] = useState(false)
    const [ausfuellen, setAusfuellen] = useState(false)
    

    return (
        <section className={classes.wahlSection}>
            <h3 className={classes.partyName}>{party.partyName}</h3>

            <div className={classes.datumContainer}><b>Datum:</b><br/>
                <div id="datum" className="datum">{party.datum}</div>
            </div>

            <div className={classes.ortContainer}>
                <div className={classes.ortText}>
                    <div><b>Ort:</b></div>
                    <div id="ort" className="ort">{party.ort}</div>
                </div>
                <iframe
                    width="250"
                    height="350"
                    style={{border: 0}}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_Key}&q=${party.ort}`}>
                </iframe>
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
                                   disabled={ess.werBringts ? true : false}/>
                            <label htmlFor={ess.essenName}>{ess.essenName}</label>
                        </div>
                        <div className={classes.werBringts}>{ess.werBringts}</div>
                    </div>
                })}
            </div>

            <div id="essenBtnContainer">
                <button id="essenBtn"
                        onClick={() => {
                            setAusfuellen(false);
                            setNeuesEssenEingabe(!neuesEssenEingabe)
                        }}>{neuesEssenEingabe ? 'Abbrechen' : 'Neues Essen'}</button>
            </div>


            {neuesEssenEingabe ? <div className={classes.neuesEssenContainer}>
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
                <button onClick={() => essenHinzufügen(neuesEssen, neueKategorie, neuerName)}>Essen hinzufügen</button>
                {ausfuellen ? <div className={classes.ausfuellen}>Bitte vollständig ausfüllen!</div> : ''}
            </div> : ''}

            <div className={classes.nameSpeichernContainer}>
                <input id="name"
                       type="text"
                       name="Name"
                       placeholder="Dein Name"
                       value={neuerName}
                       onChange={evt => setNeuerName(evt.target.value)}/>
                <button onClick={() => speichereAuswahl()}
                        className="speichernBtn">Auswahl speichern
                </button>
                {auswahlGespeichert ? <div className={classes.auswahlGespeichert}>Auswahl gespeichert</div> : ''}
            </div>

        </section>
    )


    /**
     * Finde und filtere Kategorien
     * @return {*[]} gibt ein Array zurück, dass einmalige Kategorien enthält gefunden in der party
     */
    function findKategorien() {
        const kategorieArray = party.essen.reduce((kategorien, actual) => {
            kategorien.push(actual.kategorie);
            return kategorien
        }, [])
        return [...new Set(kategorieArray)]
    }

    function essenHinzufügen(neuesEssen, neueKategorie, neuerName) {
        console.log('neu', neuesEssen, neueKategorie, neuerName)
        if (neuesEssen && neueKategorie) {
            const essen = new Essen(neueKategorie, neuesEssen, neuerName)
            props.speichereEssen(essen)
            setAusfuellen(false)
        } else {
            setAusfuellen(true)
        }
    }

    function handleChecked(event) {
        const checked = event.target.checked;
        let newChecked = checkedEssen;
        if (checked) {
            newChecked.push(event.target.value)
        } else {
            for (let i = 0; i < newChecked.length; i++) {
                if (newChecked[i] === event.target.value) {
                    newChecked.splice(i, 1);
                }
            }
        }
        //console.log(newChecked)
        setCheckedEssen(newChecked)
    }

    function speichereAuswahl() {
        props.speichereAuswahl(checkedEssen, neuerName, party)
        setCheckedEssen([])
        setAuswahlGespeichert(true)
        setTimeout(() => setAuswahlGespeichert(false), 2500)
    }

}

export default Wahl