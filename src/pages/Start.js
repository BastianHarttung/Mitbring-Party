import classes from "./Start.module.scss";
import {useState} from "react";


const Start = (props) => {
    const [isNewParty, setIsNewParty] = useState(false)

    return (
        <section className={classes.startSection}>

            <div><b>Party:</b></div>
            <div className={classes.partyCollectionContainer}>
                {props.partyCollection.map((party, index) => {
                    return <div key={index}
                                className={classes.partyBox}>
                        <div className={classes.date}>{party.datum}</div>
                        <div>{party.partyName}</div>
                    </div>
                })}
            </div>


            <button onClick={() => setIsNewParty(!isNewParty)}>
                {isNewParty ? 'Abbrechen' : 'Neue Party'}</button>

            {isNewParty ? <div className={classes.newPartyContainer}>
                <input type="text"
                       placeholder="Party Name"/>
                <input type="text"
                       placeholder="Ort"/>
                <input type="date"
                       placeholder="Datum"/>
                <textarea type="text"
                          placeholder="Infos"/>
                <button>Speichern</button>
            </div> : ''}

        </section>
    )
}

export default Start