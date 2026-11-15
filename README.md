# Mitbring-Party-Picknick

Ein Doodle-Clon für die Organisation einer Mitbring-Party. Wer bringt was zum Essen mit?\
Test the App: https://mitbring-party.bastian-harttung-projekte.de/

![mitbring-party.bastian-harttung-projekte.de_party_(Mockup - mobile).png](src/assets/img/readme/mitbring-party.bastian-harttung-projekte.de_party_%28Mockup%20-%20mobile%29.png)

### Übersicht

Eine, bei Übergröße, scrollbare Übersicht mit allen Namen und Essen, die vorhanden sind.

![mitbring-party.bastian-harttung-projekte.de_uebersicht_(Mockup - tablet).png](src/assets/img/readme/mitbring-party.bastian-harttung-projekte.de_uebersicht_%28Mockup%20-%20tablet%29.png)

### - Handy kompatibel

![mitbring-party.bastian-harttung-projekte.de_uebersicht_(Mockup - mobile).png](src/assets/img/readme/mitbring-party.bastian-harttung-projekte.de_uebersicht_%28Mockup%20-%20mobile%29.png)

#### Infos

Dies ist ein kleines privates Projekt in Javascript mit React um die Organisation von Picknicks und Fondue-Essen ohne
lästige Registrierung oder Werbung zu ermöglichen.\
Das Backend läuft direkt über den Server mit dem smallest_backend_ever von Junus Ergin.

## For Developer

### Voraussetzungen

- Node.js + npm
- Ein Webserver mit PHP (z. B. normaler Webspace mit FTP), auf dem das `smallest_backend_ever` läuft

### .env anlegen

`.env.template` nach `.env` kopieren und ausfüllen:

```
REACT_APP_MAPS_API_KEY=<Google Maps API Key>
REACT_APP_BACKEND_URL=https://<deine-domain>/smallest_backend_ever
```

- `REACT_APP_MAPS_API_KEY`: für die Karte (Google Maps Embed API).
- `REACT_APP_BACKEND_URL`: optional. Ohne Angabe wird `/smallest_backend_ever` relativ zur Domain verwendet.
  Für lokale Entwicklung (`npm start`) muss hier die absolute URL zum Backend auf dem Server stehen.
- Die Werte werden beim Build fest eingebaut. Nach einer Änderung neu bauen bzw. `npm start` neu starten.

### Lokal starten

```
npm install
npm start
```

Die App läuft dann unter http://localhost:3000.

### Befehle

| Befehl          | Beschreibung                                |
|-----------------|---------------------------------------------|
| `npm start`     | Dev-Server mit Hot Reload                   |
| `npm run build` | Produktions-Build in den Ordner `build/`    |
| `npm test`      | Tests ausführen                             |

### Deployment

1. `npm run build` ausführen.
2. Inhalt von `build/` auf den Webserver hochladen (inkl. der versteckten Datei `.htaccess`, sie leitet alle Routen auf
   `index.html` um).
3. Den Ordner `smallest_backend_ever/` auf den Server hochladen, standardmäßig neben die `index.html`.
4. Dem Ordner `smallest_backend_ever/` Schreibrechte geben (z. B. `777`), damit `database.json` gespeichert werden kann.
5. App im Browser öffnen und prüfen, ob Partys geladen und gespeichert werden.

**Hinweise**

- Die App ist für das Root einer Domain gebaut (`"homepage": "/"` in `package.json`, `RewriteBase /` in
  `public/.htaccess`). Bei einem Unterordner beides anpassen.
- `smallest_backend_ever` hat keinerlei Sicherheit: Jeder kann die `database.json` lesen und überschreiben. Keine
  sensiblen Daten speichern.
- Ein Speichervorgang darf maximal 10.000 Zeichen groß sein (Limit in `save_json.php`).
- Fehler wie `Backend lieferte kein JSON` bedeuten meist eine falsche `REACT_APP_BACKEND_URL`.