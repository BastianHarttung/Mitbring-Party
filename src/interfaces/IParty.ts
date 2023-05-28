export interface IParty {
  id: string,         // new Date().getTime().toString()
  partyName: string,
  ort: string,
  ortCoordinates?: string,  // Coordinates or Address for Google Maps
  datum: string,
  zeit: string,
  infos: string,
  essen: IEssen[],
  notizen?: INotizen[],
}

export interface IPartyApp extends IParty {
  teilnehmer: string[],
}

export interface IEssen {
  kategorie: string,
  essenName: string,
  werBringts: string,
}

export interface INotizen {
  id: string;
  name: string,
  datum: string,  // ISO String in Format "2023-05-28"
  beschreibung: string,
  // kommentare: IKommentar[], TODO

}