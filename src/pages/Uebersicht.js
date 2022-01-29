import {useParams} from "react-router-dom";

const Uebersicht = (props) =>{

    const partyId = useParams();
    const party = props.partyCollection.find((party) => party.id.toString() === partyId.id)


    return (
        <section>
            Uebersicht <br/>
            {party.partyName}
        </section>
    )
}

export default Uebersicht