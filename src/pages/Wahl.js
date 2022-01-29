import classes from './Wahl.module.scss'
import {useState} from "react";
import {Essen} from "../models/party";
import {useParams} from "react-router-dom";


const Wahl = (props) => {

    console.log(props.partyCollection)

    const partyId = useParams();
    const [party, setParty] = useState(props.partyCollection.find((part) => part.id.toString() === partyId.id))

    const [neuesEssenEingabe, setNeuesEssenEingabe] = useState(false)
    const [neueKategorie, setNeueKategorie] = useState('')
    const [neuesEssen, setNeuesEssen] = useState('')
    const [neuerName, setNeuerName] = useState('')
    const [checkedEssen, setCheckedEssen] = useState([])

    return (
        <section className={classes.wahlSection}>
            <h2 className={classes.partyName}>{party.partyName}</h2>

            <div className={classes.ortContainer}><b>Ort:</b><br/>
                <div id="ort" className="ort">{party.ort}</div>
            </div>
            <div className={classes.datumContainer}><b>Datum:</b><br/>
                <div id="datum" className="datum">{party.datum}</div>
            </div>
            <div className={classes.infosContainer}><b>Infos:</b><br/>
                <div id="infos" className="infos">{party.infos}</div>
            </div>

            <div id="checkbox-container" className={classes.checkboxContainer}>
                {party.essen.map((ess, index) => {
                    return <div key={index} className={classes.checkbox}>
                        <div className={classes.checkboxName}>
                            <input type="checkbox"
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
                        onClick={() => setNeuesEssenEingabe(!neuesEssenEingabe)}>{neuesEssenEingabe ? 'Abbrechen' : 'Neues Essen'}</button>
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
            </div> : ''}


            <input id="name"
                   type="text"
                   name="Name"
                   placeholder="Name"
                   onChange={evt => setNeuerName(evt.target.value)}/>

            <button onClick={() => speichereAuswahl()}
                    className="speichernBtn">Speichern
            </button>

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
        //console.log('neu', neuesEssen, neueKategorie, neuerName)
        const essen = new Essen(neueKategorie, neuesEssen, neuerName)
        props.speichereEssen(essen)
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
    }

}

export default Wahl