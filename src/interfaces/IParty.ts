export interface IParty {
  id: string,         // new Date().getTime().toString()
  partyName: string,
  ort: string,
  ortCoordinates?: string,  // Coordinates or Address for Google Maps
  datum: string,
  zeit: string,
  editEndDatum?: string,  // ISO "YYYY-MM-DD"; leer = Standard (1 Woche nach datum). Danach nur noch Admin
  infos: string,
  essen: IEssen[],
  notizen: INotiz[],
}

export interface IPartyApp extends IParty {
  teilnehmer: string[],
}

export interface IEssen {
  kategorie: string,
  essenName: string,
  werBringts: string,
}

export interface INotiz {
  id: string;
  name: string,
  datum: string,  // ISO String in Format "2023-05-28"
  beschreibung: string,
  // kommentare: IKommentar[], TODO
}