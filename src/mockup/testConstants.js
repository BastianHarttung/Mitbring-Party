import {Essen, Party} from "../models/party";


export const emptyParty = new Party('', '', '', '', [])
export const testPartyCollection = [
    new Party('Fondue 2021', 'Hilpoltstein, Bahnhofstr.', '2021-12-25', 'Das alljährliche Fondue.',
        [
            new Essen('Salate', 'Kartoffelsalat', 'Bastian'),
            new Essen('Salate', 'Tomatensalat', 'Sabrina'),
            new Essen('Sonstiges', 'Würstchen', 'Sabrina'),
            new Essen('Süßes', 'Kuchen', ''),
            new Essen('Süßes', 'Schokolade', '')
        ]),
    new Party('Picknick Geburtstagsparty Basti 2022', 'Rothsee', '2022-05-23', 'Das wird ein Geburtstagspicknick',
        [
            new Essen('Salate', 'Blattsalat', 'Bastian'),
            new Essen('Salate', 'Nudelsalat', 'Sabrina'),
            new Essen('Sonstiges', 'Eier', 'Patrick'),
            new Essen('Süßes', 'Kuchen', 'Silke'),
            new Essen('Süßes', 'Muffin', ''),
            new Essen('Süßes', 'Gummibären', ''),
        ])
]

export const testParty = new Party(
    'Fondue 2021',
    'Hip',
    '23.5.2022',
    'Das wird ein Geburtstagspicknick',
    [
        new Essen('Salate', 'Kartoffelsalat', 'Bastian'),
        new Essen('Salate', 'Nudelsalat', 'Sabrina'),
        new Essen('Sonstiges', 'Würstchen', ''),
        new Essen('Süßes', 'Kuchen', '')
    ])