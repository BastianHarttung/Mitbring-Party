export class Party {
    id;
    partyName;
    ort;
    datum;
    infos;
    essen;

    constructor(partyName, ort, datum, infos, essen = []) {
        this.id = Math.round(Math.random() * 10000);
        this.partyName = partyName;
        this.ort = ort;
        this.datum = new Date(datum).toLocaleDateString();
        this.infos = infos;
        this.essen = essen;
    }
}

export class Essen {
    kategorie;
    essenName;
    werBringts;

    constructor(kategorie, essenname, werBringts = '') {
        this.kategorie = kategorie;
        this.essenName = essenname;
        this.werBringts = werBringts
    }
}