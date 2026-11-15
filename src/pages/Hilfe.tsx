import classes from "./Hilfe.module.scss";

const faq = [
  {
    frage: "Ich sehe meine Auswahl nicht mehr – was ist passiert?",
    antwort: "Wahrscheinlich hast du deinen Namen geändert oder nutzt ein anderes Gerät. Trag im Profil genau den Namen ein, den du vorher benutzt hast, dann ist alles wieder da.",
  },
  {
    frage: "Warum kann ich manche Essen nicht anklicken?",
    antwort: "Die bringt schon jemand anderes mit. Wer das ist, steht in Klammern daneben.",
  },
  {
    frage: "Ich habe mich umentschieden. Kann ich das ändern?",
    antwort: "Klar! Einfach den Haken entfernen oder neu setzen und nochmal auf „Auswahl speichern“ tippen.",
  },
  {
    frage: "Kann ich meine Notiz wieder löschen?",
    antwort: "Ja, über das Mülleimer-Symbol unter deiner Notiz. Das geht aber nur bei Notizen, die unter deinem Namen geschrieben wurden.",
  },
  {
    frage: "Warum kann ich bei einer Feier nichts mehr ändern?",
    antwort: "Jede Feier ist nur bis zu einem bestimmten Datum bearbeitbar, normalerweise bis 1 Woche nach der Feier. Danach kannst du nichts mehr auswählen und keine Notizen mehr schreiben oder löschen. Die Feier verschwindet dann auch von der Startseite.",
  },
  {
    frage: "Warum muss ich ein Passwort eingeben?",
    antwort: "Manche Feiern sind mit einem Passwort geschützt. Das Passwort bekommst du vom Gastgeber. Du musst es auf jedem Gerät nur einmal eingeben. Ändert der Gastgeber das Passwort, wirst du erneut danach gefragt.",
  },
  {
    frage: "Wird mein Name irgendwo veröffentlicht?",
    antwort: "Nein. Er wird nur auf deinem Gerät gespeichert und bei deiner Auswahl und deinen Notizen angezeigt, damit die anderen wissen, wer was mitbringt.",
  },
  {
    frage: "Was ist der Administrator-Modus?",
    antwort: "Damit verwaltet der Gastgeber die Feiern. Für die normale Teilnahme brauchst du ihn nicht.",
  },
];

const Hilfe = () => {
  return (
    <section>
      <div className={classes.hilfe}>
        <h3>Hilfe</h3>

        <p className={classes.intro}>
          Schön, dass du dabei bist! 🎉 Hier erkläre ich dir kurz, wie alles funktioniert.
        </p>

        <div className={classes.card}>
          <h4>👤 Dein Name ist wichtig</h4>
          <ul>
            <li>Über deinen <b>Namen</b> erkennt die App, was <b>du</b> mitbringst.</li>
            <li>Nur mit deinem Namen kannst du deine Auswahl <b>speichern</b> und später <b>ändern</b>.</li>
            <li>Benutz deshalb <b>immer denselben Namen</b>, auch auf anderen Geräten.</li>
            <li>Du kannst ihn jederzeit im <b>Profil</b> ändern (✏️ antippen, dann 💾 speichern).</li>
          </ul>
          <p className={classes.hint}>
            💡 Wenn du deinen Namen änderst, sind deine bisherigen Einträge nicht mehr dir zugeordnet.
          </p>
        </div>

        <div className={classes.card}>
          <h4>🥗 Essen auswählen (Wahl)</h4>
          <ul>
            <li>Setz einen Haken bei allem, was du mitbringen möchtest.</li>
            <li>Tipp dann auf <b>„Auswahl speichern“</b>. Erst dann ist deine Wahl eingetragen!</li>
            <li>Ausgegraut heißt: Das bringt schon jemand anderes mit.</li>
            <li>Fehlt etwas? Mit dem <b>+</b> fügst du ein eigenes Essen hinzu.</li>
          </ul>
        </div>

        <div className={classes.card}>
          <h4>💬 Notizen zur Feier</h4>
          <ul>
            <li>Über das Sprechblasen-Symbol oben kommst du zu den Notizen.</li>
            <li>Mit dem <b>+</b> schreibst du einen Kommentar, z.B. „Ich komme etwas später“ oder „Wer hat eine Decke?“.</li>
            <li>Die Zahl an der Sprechblase zeigt dir, wie viele Notizen es gibt.</li>
            <li>Deine eigenen Notizen kannst du wieder löschen.</li>
          </ul>
        </div>

        <div className={classes.card}>
          <h4>📋 Übersicht</h4>
          <ul>
            <li>Hier siehst du auf einen Blick, <b>wer was mitbringt</b>.</li>
            <li>So siehst du schnell, was noch fehlt.</li>
          </ul>
        </div>

        <div className={classes.card}>
          <h4>❓ Häufige Fragen</h4>
          {faq.map((eintrag) => (
            <details key={eintrag.frage} className={classes.faq}>
              <summary>{eintrag.frage}</summary>
              <p>{eintrag.antwort}</p>
            </details>
          ))}
        </div>

        <p className={classes.intro}>
          Noch Fragen? Meld dich einfach bei mir 🙂
        </p>

        <hr style={{width: "100%"}}/>
        <p>© by Bastian Harttung</p>
      </div>
    </section>
  );
};

export default Hilfe;
