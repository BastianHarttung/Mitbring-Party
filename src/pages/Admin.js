import {useParams} from "react-router-dom";
import {useState} from "react";

function Admin(props) {
    const partyId = useParams();
    const [party, setParty] = useState(props.partyCollection.find((part) => part.id.toString() === partyId.id))

    return (
        <section>
            Admin {party.partyName}
        </section>
    )
}

export default Admin