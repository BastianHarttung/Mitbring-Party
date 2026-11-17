import { makeAutoObservable, runInAction, toJS } from "mobx";
import { emptyPartyCollection } from "../mockup/testConstants";
import { INotiz, IParty } from "../interfaces/IParty";
import { IEssen } from "../interfaces/IParty";
import { IPartyApp } from "../interfaces/IParty";
import { downloadFromServer, backend, setURL } from "../mini_backend";
import { TPopupStyle } from "../interfaces/Types";
import { isPartyLocked } from "../helper-functions/helper-functions";
import userStore from "./user-store";

/** So oft werden die Daten im Hintergrund neu geladen (nur solange der Tab sichtbar ist) */
const AUTO_AKTUALISIERUNG_INTERVALL_MS = 3 * 60 * 1000;
/** Mindestabstand zwischen zwei Aktualisierungen durch Tab-Wechsel / Fokus */
const MIN_ABSTAND_AKTUALISIERUNG_MS = 10 * 1000;

/**
 * Alle Server-Zugriffe laufen nacheinander durch diese Warteschlange.
 * So kann z.B. ein Hintergrund-Refresh nicht mitten in ein Speichern hineinfunken.
 */
let warteschlange: Promise<unknown> = Promise.resolve();
let letzteAktualisierung = 0;

const einreihen = <T>(aufgabe: () => Promise<T>): Promise<T> => {
  const ergebnis = warteschlange.then(aufgabe, aufgabe);
  warteschlange = ergebnis.catch(() => undefined);
  return ergebnis;
};

const sortiereNachDatum = (parties: IParty[]): IParty[] => parties.sort((a, b) => {
  if (a.datum < b.datum) return 1;
  if (a.datum > b.datum) return -1;
  else return 0;
});

const sortiereEssen = (essen: IEssen[]): void => {
  essen.sort((a, b) => {
    if (a.kategorie < b.kategorie) return -1
    if (a.kategorie > b.kategorie) return 1
    if (a.essenName.toLowerCase() < b.essenName.toLowerCase()) return -1
    if (a.essenName.toLowerCase() > b.essenName.toLowerCase()) return 1
    return 0
  })
};

/** Lädt die aktuelle partyCollection vom Server (als eigene Kopie, die verändert werden darf) */
const ladePartyCollection = async (): Promise<IParty[]> => {
  await downloadFromServer();
  const parties: IParty[] = backend.getItem("partyCollection") ?? [];
  return sortiereNachDatum(JSON.parse(JSON.stringify(parties)));
};


class GlobalStore {

  partyCollection: IParty[] = emptyPartyCollection;

  activeId: string = this.partyCollection[this.partyCollection.length - 1].id;

  popupMessage: string = "";
  popupStyle: TPopupStyle | undefined = undefined;

  isSettingsOpen: boolean = false;

  beforeUrl: string = "/";

  isLoading: boolean = false;

  notesCount: number = 0;

  /** true, solange auf der Party-Seite eine Auswahl angeklickt, aber noch nicht gespeichert ist */
  hatUngespeicherteAuswahl: boolean = false;

  constructor() {
    this.initBackend();
    this.initFromServer();
    makeAutoObservable(this);
  }

  initBackend = () => {
    // Ohne REACT_APP_BACKEND_URL wird das Backend relativ zur App geladen (liegt auf dem Server neben index.html)
    setURL(process.env.REACT_APP_BACKEND_URL || "/smallest_backend_ever");
  };

  initFromServer = (): Promise<void> => {
    this.isLoading = true;
    return einreihen(async () => {
      try {
        const parties = await ladePartyCollection();
        letzteAktualisierung = Date.now();
        runInAction(() => this.partyCollection = parties);
      } catch (error) {
        this.throwPopupMessage("Something went wrong", "error")
        console.log(error)
      } finally {
        runInAction(() => this.isLoading = false)
      }
    });
  };

  /**
   * Lädt die Daten still im Hintergrund neu (ohne Lade-Spinner).
   * Wird übersprungen, solange es eine ungespeicherte Auswahl gibt, damit die Häkchen nicht verloren gehen.
   */
  aktualisiereVomServer = (): Promise<void> => einreihen(async () => {
    if (this.hatUngespeicherteAuswahl) return;
    try {
      const parties = await ladePartyCollection();
      letzteAktualisierung = Date.now();
      // Während des Downloads könnte der User etwas angeklickt haben
      if (this.hatUngespeicherteAuswahl) return;
      // Nur ersetzen, wenn sich wirklich etwas geändert hat (vermeidet unnötiges Neu-Rendern)
      if (JSON.stringify(parties) !== JSON.stringify(toJS(this.partyCollection))) {
        runInAction(() => this.partyCollection = parties);
      }
    } catch (error) {
      // Hintergrund-Refresh: kein Popup, beim nächsten Mal klappt es vielleicht wieder
      console.log(error);
    }
  });

  /**
   * Startet die automatische Aktualisierung (Intervall + beim Zurückkehren in den Tab).
   * Gibt eine Funktion zum Stoppen zurück.
   */
  starteAutoAktualisierung = (): (() => void) => {
    const istSichtbar = () => document.visibilityState === "visible";

    const beiRueckkehr = () => {
      if (istSichtbar() && Date.now() - letzteAktualisierung > MIN_ABSTAND_AKTUALISIERUNG_MS) {
        this.aktualisiereVomServer();
      }
    };

    const intervallId = window.setInterval(() => {
      if (istSichtbar()) this.aktualisiereVomServer();
    }, AUTO_AKTUALISIERUNG_INTERVALL_MS);

    document.addEventListener("visibilitychange", beiRueckkehr);
    window.addEventListener("focus", beiRueckkehr);

    return () => {
      window.clearInterval(intervallId);
      document.removeEventListener("visibilitychange", beiRueckkehr);
      window.removeEventListener("focus", beiRueckkehr);
    };
  };

  setUngespeicherteAuswahl = (wert: boolean): void => {
    this.hatUngespeicherteAuswahl = wert;
  };

  /**
   * Read-Modify-Write: lädt zuerst den aktuellen Stand vom Server, wendet die Änderung darauf an und speichert.
   * So werden Änderungen anderer, die inzwischen gespeichert wurden, nicht überschrieben.
   * @param aenderung verändert die frisch geladenen Parties; gibt false zurück, um abzubrechen
   * @return true, wenn gespeichert wurde
   */
  private aendereParties = (aenderung: (parties: IParty[]) => boolean): Promise<boolean> => einreihen(async () => {
    try {
      const parties = await ladePartyCollection();
      letzteAktualisierung = Date.now();
      const sollSpeichern = aenderung(parties);
      if (sollSpeichern) {
        sortiereNachDatum(parties);
        await backend.setItem("partyCollection", parties);
      }
      // Auch beim Abbrechen den frischen Stand anzeigen, damit der User sieht, was sich geändert hat
      runInAction(() => this.partyCollection = parties);
      return sollSpeichern;
    } catch (error) {
      this.throwPopupMessage("Speichern fehlgeschlagen", "error")
      console.log(error)
      return false;
    }
  });

  speichereActiveId = (id: string): void => {
    this.activeId = id;
  };

  speichereNotesCount = (count: number): void => {
    this.notesCount = count
  }

  speichereParty = (party: IParty): Promise<boolean> => {
    return this.aendereParties((parties) => {
      parties.push(toJS(party));
      return true;
    });
  };

  /**
   * Nach dem Edit-Enddatum darf nur noch der Admin etwas ändern.
   * Gibt true zurück (und zeigt eine Meldung), wenn die Änderung blockiert ist.
   */
  istBearbeitungGesperrt = (party: IParty): boolean => {
    if (userStore.isAdmin || !isPartyLocked(party)) return false;
    this.throwPopupMessage("Diese Party kann nicht mehr bearbeitet werden", "error");
    return true;
  };

  speichereEssen = (id: string | undefined, essen: IEssen): Promise<boolean> => {
    return this.aendereParties((parties) => {
      const partyFind = parties.find((part) => part.id === id);
      if (!partyFind || this.istBearbeitungGesperrt(partyFind)) return false;
      const gibtEsSchon = partyFind.essen.some((ess) => ess.essenName.toLowerCase() === essen.essenName.toLowerCase());
      if (gibtEsSchon) {
        this.throwPopupMessage(`"${essen.essenName}" gibt es schon`, "error");
        return false;
      }
      partyFind.essen.push({...essen});
      sortiereEssen(partyFind.essen);
      return true;
    });
  };

  speichereNotiz = (id: string | undefined, note: INotiz): Promise<boolean> => {
    return this.aendereParties((parties) => {
      const partyFind = parties.find((party) => party.id === id);
      if (!partyFind || this.istBearbeitungGesperrt(partyFind)) return false;
      partyFind.notizen.push({...note});
      partyFind.notizen.sort((a, b) => new Date(b.datum).getTime() - new Date(a.datum).getTime());
      return true;
    });
  }

  deleteNote = (id: string | undefined, note: INotiz): Promise<boolean> => {
    return this.aendereParties((parties) => {
      const partyFind = parties.find((party) => party.id === id);
      if (!partyFind || this.istBearbeitungGesperrt(partyFind)) return false;
      partyFind.notizen = partyFind.notizen.filter((notiz) => notiz.id !== note.id);
      return true;
    });
  }

  /**
   * Speichere Auswahl und Name.
   * Essen, das inzwischen jemand anderes übernommen hat, wird nicht überschrieben.
   * @param {string array} checkedEssen checked Essen
   * @param {string} neuerName
   * @param {string} partyId Id der aktiven Party
   * @return true, wenn die komplette Auswahl gespeichert wurde
   */
  speichereAuswahl = async (checkedEssen: string[], neuerName: string, partyId: string): Promise<boolean> => {
    let schonVergeben: string[] = [];
    const gespeichert = await this.aendereParties((parties) => {
      const partyFind = parties.find((party) => party.id === partyId);
      if (!partyFind || this.istBearbeitungGesperrt(partyFind)) return false;
      for (const essen of partyFind.essen) {
        if (checkedEssen.includes(essen.essenName)) {
          if (!essen.werBringts) {
            essen.werBringts = neuerName;
          } else if (essen.werBringts !== neuerName) {
            schonVergeben.push(essen.essenName);
          }
        } else if (essen.werBringts === neuerName) {
          // Name bei abgewähltem Essen entfernen
          essen.werBringts = "";
        }
      }
      return true;
    });
    if (gespeichert) this.setUngespeicherteAuswahl(false);
    if (gespeichert && schonVergeben.length > 0) {
      this.throwPopupMessage(`Schon vergeben: ${schonVergeben.join(", ")}`, "warning");
      return false;
    }
    return gespeichert;
  };

  addTeilnehmer = (party: IParty): IPartyApp => {
    const teilnehmerArray = party.essen.map((ess) => {
      return ess.werBringts;
    });
    const clearedTeilnehmerArray = teilnehmerArray.filter((teilnehm, index) => teilnehmerArray.indexOf(teilnehm) === index && teilnehm !== "");
    return {...party, teilnehmer: clearedTeilnehmerArray};
  };

  throwPopupMessage = (message: string, style?: TPopupStyle) => {
    this.popupStyle = style;
    this.popupMessage = message;
    setTimeout(() => runInAction(() => this.popupMessage = ""), 2500);
  };

  /**
   * Speichert die vom Admin bearbeitete Party.
   * Notizen und "Wer bringt's", die der Admin nicht angefasst hat, werden vom aktuellen Server-Stand übernommen,
   * damit Einträge, die während der Bearbeitung dazugekommen sind, nicht verloren gehen.
   * @param neueParty die bearbeitete Party
   * @param originalEssen Essen so, wie es beim Öffnen der Admin-Seite war
   */
  updatePartyBackend = (neueParty: IParty, originalEssen: IEssen[]): Promise<boolean> => {
    return this.aendereParties((parties) => {
      const partyIndex = parties.findIndex((party) => party.id === neueParty.id);
      if (partyIndex === -1) {
        this.throwPopupMessage("Party existiert nicht mehr", "error");
        return false;
      }
      const aktuelleParty = parties[partyIndex];
      const essen = toJS(neueParty.essen).map((ess) => {
        const original = originalEssen.find((orig) => orig.essenName === ess.essenName);
        const aktuell = aktuelleParty.essen.find((akt) => akt.essenName === ess.essenName);
        const vomAdminGeaendert = !original || original.werBringts !== ess.werBringts;
        return (!vomAdminGeaendert && aktuell) ? {...ess, werBringts: aktuell.werBringts} : {...ess};
      });
      parties.splice(partyIndex, 1, {...toJS(neueParty), essen, notizen: aktuelleParty.notizen});
      return true;
    });
  };

  loeschePartyBackend = (id: string): Promise<boolean> => {
    return this.aendereParties((parties) => {
      const partyIndex = parties.findIndex((party) => party.id === id);
      if (partyIndex === -1) return false;
      parties.splice(partyIndex, 1);
      return true;
    });
  };

  openSettings = (url: string) => {
    this.beforeUrl = url;
    this.isSettingsOpen = true;
  };

  closeSettings = () => {
    this.isSettingsOpen = false;
  };

  /**
   * Find and filter Categories
   * @return {*[]} return Array with unique categories as string of party
   */
  findKategorien = (party: IParty): string[] => {
    const vorhandeneKategorienArray = party.essen.map((essen) => {
      return essen.kategorie;
    }, []);
    const kategorieArray = [...vorhandeneKategorienArray, "Sonstiges"];
    return kategorieArray.filter((item, index) => kategorieArray.indexOf(item) === index);
  };

}

const globalStore = new GlobalStore();
export default globalStore;
