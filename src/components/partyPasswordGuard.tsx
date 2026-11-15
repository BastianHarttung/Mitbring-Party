import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import globalStore from "../stores/global-store";
import userStore from "../stores/user-store";
import { isPartyFreigeschaltet } from "../helper-functions/helper-functions";
import ModalPartyPassword from "./modals/modalPartyPassword";


interface PartyPasswordGuardProps {
  children: JSX.Element;
}

/**
 * Zeigt die Party-Seite erst an, wenn das (optionale) Party-Passwort eingegeben wurde.
 * Der Admin braucht kein Party-Passwort.
 */
const PartyPasswordGuard = ({children}: PartyPasswordGuardProps): JSX.Element => {

  const {partyCollection, isLoading} = globalStore;
  const {isAdmin} = userStore;

  const params = useParams();
  const partyFind = partyCollection.find((party) => party.id.toString() === params.id);

  // Nur zum Neu-Rendern nach erfolgreicher Eingabe (der Hash liegt im localStorage)
  const [, setFreigeschaltetCount] = useState(0);

  // Laden / unbekannte Party behandelt die Seite selbst
  if (isLoading || !partyFind || isAdmin || isPartyFreigeschaltet(partyFind)) {
    return children;
  }

  return <ModalPartyPassword party={partyFind}
                             onSuccess={() => setFreigeschaltetCount((count) => count + 1)}/>;
};

export default observer(PartyPasswordGuard);
