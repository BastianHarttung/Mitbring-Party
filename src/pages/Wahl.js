import classes from './Wahl.module.scss'

const Wahl = (props) => {
    return (
        <section className={classes.wahlSection}>
            <h2 id="partyName">Fondue</h2>

            <div className={classes.ortContainer}><b>Ort:</b><br/>
                <div id="ort" className="ort"></div>
            </div>

            <div className={classes.infosContainer}><b>Infos:</b><br/>
                <div id="infos" className="infos"></div>
            </div>

            <div id="checkbox-container" className="checkbox-container">
            </div>

            <div id="essenBtnContainer">
                <button id="essenBtn" onClick={neuesEssen()}>Neues Essen</button>
            </div>

            <div id="neuesEssenContainer"></div>

            <input id="name" type="text" name="Name" placeholder="Name"/>

            <button onClick={speichereAuswahl()}
                    className="speichernBtn">Speichern
            </button>

        </section>
    )

    function neuesEssen(){

    }

    function speichereAuswahl(){

    }

}

export default Wahl