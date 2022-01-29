export class Party {
    id;
    partyName;
    ort;
    datum;
    infos;
    essen;
    persons;

    constructor(partyName, ort, datum, infos, essen = []) {
        this.id = new Date(datum).getTime();  //Math.round(Math.random() * 10000);
        this.partyName = partyName;
        this.ort = ort;
        this.datum = new Date(datum).toLocaleDateString();
        this.infos = infos;
        this.essen = essen;
        this.persons = [];
        this.addPersons()
    }

    addPersons() {
        for (let i = 0; i < this.essen.length; i++) {
            if(this.essen[i].werBringts){
                this.persons.push(this.essen[i].werBringts)
            }
        }
        this.persons = [...new Set(this.persons)]
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