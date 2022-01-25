export class Party {
    id;
    partyName;
    ort;
    datum;
    infos;
    essen;

    constructor(id, partyName, ort, datum, infos, essen) {
        this.id = id;
        this.partyName = partyName;
        this.ort = ort;
        this.datum = datum;
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