import {useParams} from "react-router-dom";
import {useState} from "react";
import globalStore from "../stores/global-store";
import classes from "./Admin.module.scss"

function Admin() {
    const {partyCollection} = globalStore;

    const partyId = useParams();
    const [party, setParty] = useState(partyCollection.find((part) => part.id.toString() === partyId.id))

    const [partyName, setPartyName] = useState(party.partyName);
    const [ort, setOrt] = useState(party.ort);
    const [datum, setDatum] = useState(party.datum);
    const [infos, setInfos] = useState(party.infos);
    const [essen, setEssen] = useState(party.essen);
    const [teilnehmer, setTeilnehmer] = useState(party.teilnehmer);

    const handleChangeEssenName = (ess) => {
        const essenFilter = essen.filter((es) => es.essenName === ess.essenName)
        setEssen([...essen])
    }

    return (
        <section className={classes.adminSection}>
            <input type="text"
                   value={partyName}
                   onChange={(e) => setPartyName(e.target.value)}/>
            <input type="text"
                   value={ort}
                   onChange={(e) => setOrt(e.target.value)}/>
            <input type="date"
                   value={datum}
                   onChange={(e) => setDatum(e.target.value)}/>
            <textarea type="text"
                      value={infos}
                      onChange={(e) => setInfos(e.target.value)}/>
            {essen.map((ess) => {
                return <div>
                    <input type="text"
                           value={ess.essenName}
                           onChange={handleChangeEssenName(ess)}/>
                    <input type="text"
                           value={ess.werBringts}
                           onChange={(e) => ess.werBringts = e.target.value}/>
                </div>
            })}
        </section>
    )
}

export default Admin