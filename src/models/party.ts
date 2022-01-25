export class Party {
    id: number;
    partyName: string;
    ort: string;
    datum: string;
    infos: string;
    essen: [];

    constructor(id: number, partyName: string, ort: string, datum: string, infos: string, essen: []) {
        this.id = id;
        this.partyName = partyName;
        this.ort = ort;
        this.datum = datum;
        this.infos = infos;
        this.essen = essen;
    }
}

export class Essen {
    kategorie: string;
    essenName: string;
    werBringts: string;

    constructor(kategorie: string, essenname: string, werBringts: string = '') {
        this.kategorie = kategorie;
        this.essenName = essenname;
        this.werBringts = werBringts
    }
}