import {IParty} from "../interfaces/IParty";
import {IPartyApp} from "../interfaces/IParty";

export const emptyParty: IPartyApp = {
  id: "0",
  partyName: "",
  ort: "",
  ortCoordinates: "",
  datum: "",
  zeit: "",
  infos: "",
  essen: [],
  notizen: [],
  teilnehmer: [],
};
export const emptyPartyCollection: IParty[] = [
  {
    id: "0",
    partyName: "",
    ort: "",
    ortCoordinates: "",
    datum: "",
    zeit: "",
    infos: "",
    essen: [],
    notizen: [],
  },
];


export const birthdayParty = {
  id: "1652027075154",
  partyName: "Geburtstags-Picknick Basti 40er",
  ort: "Rothsee/Birkach",
  ortCoordinates: "49.230910, 11.197084",
  datum: "2023-06-10",
  zeit: "15:00",
  infos: "Lasst uns einfach Spaß haben und den Tag genießen mit einem Picknick wo jeder was mitbringen darf und die Leckereien genießen kann, die andere mitgebracht haben.\n" +
    "Und damit die Vorfreude noch größer wird und wir nicht zu viel doppelt haben tragt bitte ein was ihr mitbringt.\n" +
    "Entweder macht ihr Häkchen und drückt \"Auswahl speichern\" oder noch besser ihr klickt \"+\" und tragt selber was ein.\n" +
    "Für Getränke sorgen wir, außer ihr braucht irgendwas ganz Spezielles.\n" +
    "Wir freuen uns auf euch.",
  essen: [
    {
      kategorie: "Salate",
      essenName: "Nudelsalat",
      werBringts: ""
    },
    {
      kategorie: "Süßes",
      essenName: "Muffins",
      werBringts: ""
    },
    {
      kategorie: "Herzhaftes",
      essenName: "Bratwürstchen/ Nürnberger",
      werBringts: "Patrick"
    },
    {
      kategorie: "Salate",
      essenName: "Takkosalat",
      werBringts: ""
    },
    {
      kategorie: "Salate",
      essenName: "Kartoffelsalat",
      werBringts: "Bastian"
    },
    {
      kategorie: "Herzhaftes",
      essenName: "Baguetteschlange",
      werBringts: "Julia"
    },
    {
      kategorie: "Beilagen",
      essenName: "Zatziki",
      werBringts: "Sabrina"
    },
    {
      kategorie: "Herzhaftes",
      essenName: "Herzhafte Spieße (z.B. Käse-Weintraube u.a.m.)",
      werBringts: "Silke/Tree"
    },
    {
      kategorie: "Herzhaftes",
      essenName: "Fleischküchle",
      werBringts: ""
    },
    {
      kategorie: "Salate",
      essenName: "Melonensalat",
      werBringts: ""
    }
  ],
  notizen: []
}

export const testPartyCollection: IParty[] = [
  {
    id: "1667260800000",
    partyName: "Fondue 2022",
    ort: "Hip Joe + Birgitt",
    ortCoordinates: "Altstadtring 40, 91161 Hilpoltstein",
    datum: "2022-12-25",
    zeit: "11:30",
    infos: "Das alljährliche Weihnachtsfondue",
    essen: [],
    notizen: [],
  },
  birthdayParty
]