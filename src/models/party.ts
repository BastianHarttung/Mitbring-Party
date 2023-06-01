import {IEssen, INotiz} from "../interfaces/IParty";


export class Party {
  id: string;
  partyName: string;
  ort: string;
  datum: string;
  zeit: string;
  infos: string;
  essen: IEssen[];
  notizen: INotiz[];
  teilnehmer: string[];

  constructor(partyName: string, ort: string, datum: string, zeit: string, infos: string, essen: IEssen[] = [], notizen: INotiz[] = [] ) {
    this.id = new Date().getTime().toString();
    this.partyName = partyName;
    this.ort = ort;
    this.datum = datum;
    this.zeit = zeit;
    this.infos = infos;
    this.essen = essen;
    this.notizen = notizen;
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

export class Notiz {
  id: string;
  name: string;
  datum: string;  // ISO String in Format "2023-05-28"
  beschreibung: string;

  constructor(name: string, beschreibung: string, datum?: string,) {
    this.id = new Date().getTime().toString();
    this.name = name;
    this.datum = datum ?? new Date().toISOString().split("T")[0];
    this.beschreibung = beschreibung
  }
}