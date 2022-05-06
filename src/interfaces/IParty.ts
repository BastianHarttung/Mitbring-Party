export interface IParty {
  id: string,         // new Date().getTime().toString()
  partyName: string,
  ort: string,
  ortCoordinates?: string,  // Coordinates or Address for Google Maps
  datum: string,
  zeit: string,
  infos: string,
  essen: IEssen[],
}

export interface IPartyApp extends IParty {
  teilnehmer: string[],
}

export interface IEssen {
  kategorie: string,
  essenName: string,
  werBringts: string,
}