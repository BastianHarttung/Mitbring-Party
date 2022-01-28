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
                        <Link to={"wahl/" + party.id}
                              key={index}
                              className={classes.partyBox}>
                            <div className={classes.date}>{party.datum}</div>
                            <div>{party.partyName}</div>
                        </Link>
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