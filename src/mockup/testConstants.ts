import {IParty} from "../interfaces/IParty";

export const emptyPartyCollection: IParty[] = [
  {
    id: 0,
    partyName: "",
    ort: "",
    datum: "",
    infos: "",
    essen: [],
    teilnehmer: [],
  }
];

export const testPartyCollection: IParty[] = [
  {
    id: 1,
    partyName: "Fondue 2022",
    ort: "Hilpoltstein",
    datum: "2022-12-25",
    infos: "Das alljährliche Weihnachtsfondue",
    essen: [],
    teilnehmer: ["Bastian", "Julia", "Frank", "Patrick"],
  },
  {
    id: 2,
    partyName: "Geburtstagspicknick Julia + Basti 2022",
    ort: "Rothsee",
    datum: "2022-05-28",
    infos: "Wir feiern Geburtstag :)\n" +
      "Mit einem Picknick wo jeder was mitbringen darf und die Leckereien genießen kann, die andere mitgebracht haben. \n" +
      "Lasst uns Spaß haben.\n" +
      "Und damit nicht zu viel doppelt kommt tragt ein was ihr mitbringt.",
    essen: [
      {
        kategorie: "Salate",
        essenName: "Nudelsalat",
        werBringts: "Sabrina",
      },
      {
        kategorie: "Süßes",
        essenName: "Kuchen",
        werBringts: "Julia",
      },
      {
        kategorie: "Herzhaftes",
        essenName: "Gefüllte Eier",
        werBringts: "Patrick",
      },
      {
        kategorie: "Süßes",
        essenName: "Muffins",
        werBringts: "",
      },
    ],
    teilnehmer: ["Sabrina", "Julia", "Patrick"],
  },

];