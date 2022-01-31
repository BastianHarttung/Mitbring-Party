import classes from "./Start.module.scss";
import {useState} from "react";
import {Party} from "../models/party";
import {Link} from "react-router-dom";


const Start = (props) => {

    const [isNewParty, setIsNewParty] = useState(false)

    const [partyName, setPartyName] = useState('')
    const [ort, setOrt] = useState('')
    const [datum, setDatum] = useState('')
    const [info, setInfo] = useState('')

    return (
        <section className={classes.startSection}>

            <div><b>Party:</b></div>
            <div className={classes.partyCollectionContainer}>
                {props.partyCollection.map((party, index) => {
                    return (
                        <div key={index}
                             className={classes.partyContainer}>
                            <Link to={"/wahl/" + party.id}
                                  onClick={() => props.idSpeichern(party.id)}
                                  className={classes.partyBox}>
                                <div className={classes.date}>{party.datum}</div>
                                <div>{party.partyName}</div>
                            </Link>
                            <Link to={"admin/" + party.id}
                                  className={classes.editLink}>
                                <svg viewBox="0 0 576 512">
                                    <path
                                        d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z"/>
                                </svg>
                            </Link>
                        </div>
                    )
                })}
            </div>


            <button onClick={() => setIsNewParty(!isNewParty)}>
                {isNewParty ? 'Abbrechen' : 'Neue Party'}</button>

            {isNewParty ? <div className={classes.newPartyContainer}>
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
                <textarea type="text"
                          placeholder="Infos"
                          value={info}
                          onChange={(e) => setInfo(e.target.value)}/>
                <button onClick={() => {
                    props.partySpeichern(new Party(partyName, ort, datum, info))
                    setPartyName('');
                    setOrt('');
                    setDatum('');
                    setInfo('')
                }}>Speichern
                </button>
            </div> : ''}

        </section>
    )
}

export default Start