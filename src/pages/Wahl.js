import classes from './Wahl.module.scss'
import {useState} from "react";


const Wahl = (props) => {

    const [neuesEssenEingabe, setNeuesEssenEingabe] = useState(false)

    return (
        <section className={classes.wahlSection}>
            <h2 id="partyName">{props.party.partyName}</h2>

            <div className={classes.ortContainer}><b>Ort:</b><br/>
                <div id="ort" className="ort">{props.party.ort}</div>
            </div>

            <div className={classes.infosContainer}><b>Infos:</b><br/>
                <div id="infos" className="infos">{props.party.infos}</div>
            </div>

            <div id="checkbox-container" className={classes.checkboxContainer}>
                {props.party.essen.map((ess, index) => {
                    return <div key={index} className={classes.checkbox}>
                        <div className={classes.checkboxName}>
                            <input type="checkbox"
                                   name={ess.essenName}
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

            <div className={classes.neuesEssenContainer}>
                {neuesEssenEingabe ? <div>
                    <input type="text" placeholder="Essen"/>
                    <input type="datalist" list="kategorie" placeholder="Kategorie"/>
                    <datalist id="kategorie">
                        {findKategorien().map((kategorie, index) => <option key={index} value={kategorie}/>)
                        }
                    </datalist>
                    <button onClick={() => essenHinzufügen()}>Essen hinzufügen</button>
                </div> : ''}
            </div>

            <input id="name" type="text" name="Name" placeholder="Name"/>

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
        const kategorieArray = props.party.essen.reduce((kategorien, actual) => {
            kategorien.push(actual.kategorie);
            return kategorien
        }, [])
        return [...new Set(kategorieArray)]
    }

    function essenHinzufügen() {
        console.log('essen hinzu')
    }

    function speichereAuswahl() {
        console.log('speichere auswahl')
    }

}

export default Wahl