export interface IParty {
  id: number,
  partyName: string,
  ort: string,
  datum: string,
  infos: string,
  essen: IEssen[],
  teilnehmer: string[],
}

export interface IEssen {
  kategorie: string,
  essenName: string,
  werBringts: string,
}