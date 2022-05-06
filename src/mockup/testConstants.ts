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
  },
];

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
  },
  {
    id: "1651865749256",
    partyName: "Geburtstags-picknick Julia + Basti 2022",
    ort: "Rothsee",
    ortCoordinates: "49.230910, 11.197084",
    datum: "2022-05-28",
    zeit: "15:00",
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
  },

];