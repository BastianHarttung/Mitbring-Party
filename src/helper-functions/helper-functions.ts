import { IParty } from "../interfaces/IParty";

/**
 * Erzeugt einen SHA-256-Hash (hex) des übergebenen Strings.
 * Hinweis: crypto.subtle ist nur in sicheren Kontexten verfügbar (HTTPS oder localhost).
 */
export const hashPassword = async (pw: string): Promise<string> => {
  const data = new TextEncoder().encode(pw);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
};

/** localStorage-Key, unter dem der Hash des eingegebenen Party-Passworts liegt */
const partyPasswortStorageKey = (partyId: string) => `partyPasswort_${partyId}`;

/**
 * Ist die Party für dieses Gerät freigeschaltet?
 * true, wenn die Party kein Passwort hat oder der gespeicherte Hash zum aktuellen Passwort passt.
 * Ändert der Admin das Passwort, passt der alte Hash nicht mehr.
 */
export const isPartyFreigeschaltet = (party: Pick<IParty, "id" | "passwortHash">): boolean => {
  if (!party.passwortHash) return true;
  return localStorage.getItem(partyPasswortStorageKey(party.id)) === party.passwortHash.toLowerCase();
};

/**
 * Prüft das eingegebene Passwort gegen den Hash der Party und merkt es sich bei Erfolg im localStorage.
 */
export const pruefePartyPasswort = async (party: Pick<IParty, "id" | "passwortHash">, pw: string): Promise<boolean> => {
  if (!party.passwortHash) return true;
  const hash = await hashPassword(pw);
  if (hash !== party.passwortHash.toLowerCase()) return false;
  localStorage.setItem(partyPasswortStorageKey(party.id), hash);
  return true;
};

export const datumZuLocalString = (datum: string) => {
  return new Date(datum).toLocaleDateString("de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );
};

/** Standard: So viele Tage nach dem Party-Datum endet die Bearbeitung */
export const EDIT_END_TAGE_NACH_PARTY = 7;

/** Heutiges lokales Datum im Format "YYYY-MM-DD" */
export const heuteIsoDatum = (): string => {
  const heute = new Date();
  const monat = String(heute.getMonth() + 1).padStart(2, "0");
  const tag = String(heute.getDate()).padStart(2, "0");
  return `${heute.getFullYear()}-${monat}-${tag}`;
};

/** Addiert Tage zu einem ISO-Datum ("YYYY-MM-DD"), ohne Zeitzonen-Verschiebung */
export const addiereTage = (datum: string, tage: number): string => {
  const [jahr, monat, tag] = datum.split("-").map(Number);
  return new Date(Date.UTC(jahr, monat - 1, tag + tage)).toISOString().split("T")[0];
};

/**
 * Standard-Enddatum der Bearbeitung: 1 Woche nach dem Party-Datum.
 * Gibt "" zurück, wenn die Party kein (gültiges) Datum hat.
 */
export const standardEditEndDatum = (datum: string): string => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum)) return "";
  return addiereTage(datum, EDIT_END_TAGE_NACH_PARTY);
};

/**
 * Effektives Enddatum der Bearbeitung (vom Admin gesetzt oder Standard).
 * "" bedeutet: kein Enddatum, Party bleibt immer bearbeitbar.
 */
export const getEditEndDatum = (party: Pick<IParty, "datum" | "editEndDatum">): string => {
  return party.editEndDatum || standardEditEndDatum(party.datum);
};

/**
 * Party ist gesperrt, wenn das Enddatum vorbei ist.
 * Am Enddatum selbst kann noch bearbeitet werden.
 */
export const isPartyGesperrt = (party: Pick<IParty, "datum" | "editEndDatum">): boolean => {
  const editEnde = getEditEndDatum(party);
  return !!editEnde && heuteIsoDatum() > editEnde;
};
