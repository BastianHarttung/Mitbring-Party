import {Essen, Party} from "../models/party";


export const testPartyCollection = [
  new Party(1, "Fondue 2021", "Hilpoltstein, Bahnhofstr.", "2021-12-25", "Das alljährliche Fondue.",
    [
      new Essen("Salate", "Kartoffelsalat", "Bastian"),
      new Essen("Salate", "Tomatensalat", "Sabrina"),
      new Essen("Sonstiges", "Würstchen", "Sabrina"),
      new Essen("Süßes", "Kuchen", ""),
      new Essen("Süßes", "Schokolade", ""),
    ]),
  new Party(2, "Picknick Geburtstagsparty Basti 2022", "Rothsee", "2022-05-23", "Wir feiern Geburtstag :)\n" +
    "Mit einem Picknick wo jeder was mitbringen darf und die Leckereien genießen kann, die andere mitgebracht haben. \n" +
    "Lasst uns Spaß haben.\n" +
    "Und damit nicht zu viel doppelt kommt tragt ein was ihr mitbringt.",
    [
      new Essen("Salate", "Blattsalat", "Bastian"),
      new Essen("Salate", "Nudelsalat", "Sabrina"),
      new Essen("Sonstiges", "Eier", "Patrick"),
      new Essen("Süßes", "Kuchen", "Silke"),
      new Essen("Süßes", "Muffin", ""),
      new Essen("Süßes", "Gummibären", ""),
    ]),
];