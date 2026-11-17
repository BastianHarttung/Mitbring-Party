import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import globalStore from "../stores/global-store";
import userStore from "../stores/user-store";
import { isPartyFreigeschaltet } from "../helper-functions/helper-functions";
import ModalPartyPassword from "./modals/modalPartyPassword";
import { useDocumentTitle } from "../hooks/useDocumentTitle";


/**
 * Layout-Route: Zeigt die Kind-Route (Party, Übersicht, Notizen) erst an,
 * wenn das (optionale) Party-Passwort eingegeben wurde.
 * Der Admin braucht kein Party-Passwort.
 */
const PartyPasswordGuard = (): JSX.Element => {

  const {partyCollection, isLoading} = globalStore;
  const {isAdmin} = userStore;

  const params = useParams();
  const partyFind = partyCollection.find((party) => party.id.toString() === params.id);

  // Party-Name im Browser-Tab anzeigen (gilt für Party, Übersicht und Notizen)
  useDocumentTitle(partyFind?.partyName);

  // Nur zum Neu-Rendern nach erfolgreicher Eingabe (der Hash liegt im localStorage)
  const [, setFreigeschaltetCount] = useState(0);

  // Laden / unbekannte Party behandelt die Seite selbst
  if (isLoading || !partyFind || isAdmin || isPartyFreigeschaltet(partyFind)) {
    return <Outlet/>;
  }

  return <ModalPartyPassword party={partyFind}
                             onSuccess={() => setFreigeschaltetCount((count) => count + 1)}/>;
};

export default observer(PartyPasswordGuard);
