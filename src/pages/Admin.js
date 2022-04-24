import {useParams} from "react-router-dom";
import {useState} from "react";
import globalStore from "../stores/global-store";

function Admin() {
    const {partyCollection} = globalStore;

    const partyId = useParams();
    const [party, setParty] = useState(partyCollection.find((part) => part.id.toString() === partyId.id))

    return (
        <section>
            Admin {party.partyName}
        </section>
    )
}

export default Admin