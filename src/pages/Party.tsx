import classes from "./Party.module.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { FiPlus } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";
import ModalNewFood from "../components/modals/modalNewFood";
import OrtAccordion from "../components/party/ortAccordion";
import FoodCheck from "../components/party/foodCheck";
import NoParty from "../components/noParty";
import { datumZuLocalString, getEditEndDatum, isPartyLocked } from "../helper-functions/helper-functions";
import { IEssen, IParty } from "../interfaces/IParty";
import { emptyParty } from "../mockup/testConstants";
import globalStore from "../stores/global-store";
import userStore from "../stores/user-store";
import Button from "../ui-components/Button";
import ButtonCircle from "../ui-components/Button-Circle";
import Loading from "../ui-components/Loading";


const Party = () => {

  const {
    partyCollection,
    isLoading,
    speichereActiveId,
    speichereNotesCount,
    speichereAuswahl,
    speichereEssen,
    findKategorien,
    throwPopupMessage,
    setUngespeicherteAuswahl,
  } = globalStore;

  const {userName, isAdmin} = userStore;

  const params = useParams();
  const partyFind = partyCollection.find((part) => part.id.toString() === params.id);

  // const userCheckedEssen = () => {
  //   if (partyFind) {
  //     const essenArray = [];
  //     for (let i = 0; i < partyFind.essen.length; i++) {
  //       if (partyFind.essen[i].werBringts === userName) {
  //         essenArray.push(partyFind.essen[i].essenName);
  //       }
  //     }
  //     return essenArray;
  //   } else {
  //     return [];
  //   }
  // }

  const [party, setParty] = useState<IParty>(emptyParty);

  const [checkedEssen, setCheckedEssen] = useState<string[]>([]);

  const [isModalNewFoodOpen, setIsModalNewFoodOpen] = useState(false);

  function handleChecked(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    const essenName = event.target.value;

    let newChecked = checkedEssen;
    if (checked) {
      // Add essen to array
      newChecked.push(essenName);
    } else {
      // Filter Essen out of Array
      newChecked = newChecked.filter((item) => item !== essenName);
    }
    setCheckedEssen(newChecked);
    // Verhindert, dass der Hintergrund-Refresh die noch nicht gespeicherten Häkchen zurücksetzt
    setUngespeicherteAuswahl(true);
  }

  async function auswahlSpeichern() {
    if (userName && await speichereAuswahl(checkedEssen, userName, party.id)) {
      throwPopupMessage("Auswahl gespeichert", "success");
    }
  }

  async function linkTeilen() {
    const url = window.location.href;
    // Auf Touch-Geräten (Handy/Tablet) das native Teilen-Menü öffnen (WhatsApp, Signal, ...)
    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: party.partyName,
          text: `Komm zur Party "${party.partyName}" und trag ein, was du mitbringst:`,
          url,
        });
      } catch (error) {
        // Abbruch durch den Nutzer ist kein Fehler
        if ((error as DOMException).name !== "AbortError") {
          await linkKopieren(url);
        }
      }
      return;
    }

    await linkKopieren(url);
  }

  async function linkKopieren(url: string) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback für http / ältere Browser
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      throwPopupMessage("Link kopiert", "success");
    } catch {
      throwPopupMessage("Link konnte nicht kopiert werden", "error");
    }
  }

  // Beim Verlassen der Seite gibt es keine ungespeicherte Auswahl mehr
  useEffect(() => () => setUngespeicherteAuswahl(false), [setUngespeicherteAuswahl]);

  const handleSaveNewFood = (foodObj: IEssen) => {
    speichereEssen(params.id, foodObj);
    setIsModalNewFoodOpen(false);
  };

  const essen = party.essen.slice().sort((a, b) => {
    if (a.werBringts === userName && b.werBringts !== userName) return -1
    if (a.werBringts !== userName && b.werBringts === userName) return 1
    if (a.werBringts === "" && b.werBringts !== "") return -1
    if (a.werBringts !== "" && b.werBringts === "") return 1
    else return 0
  })

  useEffect(() => {
    const userCheckedEssen = () => {
      if (partyFind) {
        const essenArray = [];
        for (let i = 0; i < partyFind.essen.length; i++) {
          if (partyFind.essen[i].werBringts === userName) {
            essenArray.push(partyFind.essen[i].essenName);
          }
        }
        return essenArray;
      } else return []
    }
    if (params.id) {
      speichereActiveId(params.id);
    }
    setCheckedEssen(userCheckedEssen)
    // Auswahl entspricht jetzt wieder dem Server-Stand
    setUngespeicherteAuswahl(false)
    speichereNotesCount(partyFind?.notizen?.length ?? 0)
    setParty(partyFind ? partyFind : emptyParty);
  }, [partyFind, params.id, speichereActiveId, speichereNotesCount, setUngespeicherteAuswahl, userName]);


  if (isLoading) {
    return <Loading/>
  }

  if (!partyFind) {
    return <NoParty/>;
  }

  const isLocked = isPartyLocked(party);
  // Der Admin darf auch nach dem Enddatum noch ändern
  const isReadonly = isLocked && !isAdmin;

  return (
    <section>
      <ModalNewFood isOpen={isModalNewFoodOpen}
                    onClose={() => setIsModalNewFoodOpen(false)}
                    onSave={handleSaveNewFood}
                    categories={findKategorien(party)}/>

      <h3 className={classes.partyName}>{party.partyName}</h3>

      <button type="button"
              className={classes.shareBtn}
              onClick={linkTeilen}
              aria-label="Link zur Party teilen"
              title="Link teilen">
        <IoShareSocialOutline size={24}/>
      </button>

      {isLocked &&
        <div className="gesperrt-hinweis">
          Bearbeitung beendet seit {datumZuLocalString(getEditEndDatum(party))}.
          {isAdmin ? " Nur du als Admin kannst noch etwas ändern." : " Es kann nichts mehr geändert werden."}
        </div>}

      <div className={classes.datumContainer}><b>Datum:</b><br/>
        <div id="datum" className="datum">{datumZuLocalString(party.datum)}</div>
      </div>

      <div className={classes.zeitContainer}><b>Zeit:</b><br/>
        <div id="zeit" className="zeit">{party.zeit} Uhr</div>
      </div>

      <OrtAccordion party={party}/>

      <div className={classes.infosContainer}><b>Infos:</b><br/>
        <textarea id="infos"
                  value={party.infos}
                  rows={7}
                  readOnly/>
      </div>

      <div id="checkbox-container" className={classes.checkboxContainer}>
        {essen.map((ess, index) => (
          <FoodCheck key={index}
                     essen={ess}
                     onChecked={handleChecked}
                     checkedEssen={checkedEssen}
                     readOnly={isReadonly}/>))}
      </div>

      {!isReadonly && <>
        <div id="essenBtnContainer"
             className={classes.essenBtnContainer}>
          <ButtonCircle
            onClick={() => setIsModalNewFoodOpen(true)}
            icon={<FiPlus/>}
            btnStyle="primary"
            size="18px"/>
        </div>

        <div className={classes.nameSpeichernContainer}>
          <Button onClick={auswahlSpeichern}>
            Auswahl speichern
          </Button>
        </div>
      </>}

    </section>
  );

};

export default observer(Party);
