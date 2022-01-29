import classes from "./Uebersicht.module.scss"
import {useParams} from "react-router-dom";

const Uebersicht = (props) => {

    const partyId = useParams();
    const party = props.partyCollection.find((party) => party.id.toString() === partyId.id)

    return (
        <section>
            <div className={classes.tableContainer}>
                <table id="table" className={classes.table}>

                    <thead>
                    <tr id="table-head-row">
                        <th className={classes.tableStart}>{party.partyName}</th>
                    </tr>
                    </thead>

                    <tbody id="table-eat">
                    {party.essen.map((essen, index) => {
                        return <tr id={"tableRow" + index}
                                   key={index}>
                            <td className={classes.tableRow}>{essen.essenName}</td>
                        </tr>
                    })}
                    </tbody>

                </table>
            </div>
        </section>
    )
}

export default Uebersicht