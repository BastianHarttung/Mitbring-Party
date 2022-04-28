export class Party {
  id;
  partyName;
  ort;
  datum;
  infos;
  essen;
  teilnehmer;

  constructor(id, partyName, ort, datum, infos, essen = []) {
    this.id = id;
    this.partyName = partyName;
    this.ort = ort;
    this.datum = datum;
    this.infos = infos;
    this.essen = essen;
    this.teilnehmer = [];
    this.addPersons();
  }

  addPersons() {
    for (let i = 0; i < this.essen.length; i++) {
      if (this.essen[i].werBringts) {
        this.teilnehmer.push(this.essen[i].werBringts);
      }
    }
    this.teilnehmer = [...new Set(this.teilnehmer)];
  }

}

export class Essen {
  kategorie;
  essenName;
  werBringts;

  constructor(kategorie, essenname, werBringts = "") {
    this.kategorie = kategorie;
    this.essenName = essenname;
    this.werBringts = werBringts;
  }
}