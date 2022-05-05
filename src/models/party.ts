import {IEssen} from "../interfaces/IParty";

export class Party {
  id: string;
  partyName: string;
  ort: string;
  datum: string;
  zeit: string;
  infos: string;
  essen: IEssen[];
  teilnehmer: string[];

  constructor(partyName: string, ort: string, datum: string, zeit: string, infos: string, essen: IEssen[] = []) {
    this.id = new Date().getTime().toString();
    this.partyName = partyName;
    this.ort = ort;
    this.datum = datum;
    this.zeit = zeit;
    this.infos = infos;
    this.essen = essen;
    this.teilnehmer = [];
    this.addTeilnehmer();
  }

  addTeilnehmer() {
    for (let i = 0; i < this.essen.length; i++) {
      if (this.essen[i].werBringts) {
        this.teilnehmer.push(this.essen[i].werBringts);
      }
    }
    // @ts-ignore
    this.teilnehmer = [...new Set(this.teilnehmer)];
  }

}

export class Essen {
  kategorie: string;
  essenName: string;
  werBringts: string;

  constructor(kategorie: string, essenname: string, werBringts: string = "") {
    this.kategorie = kategorie;
    this.essenName = essenname;
    this.werBringts = werBringts;
  }
}