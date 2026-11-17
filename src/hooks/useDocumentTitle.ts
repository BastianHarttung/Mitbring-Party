import { useEffect } from "react";

const BASIS_TITEL = "Mitbring Party";

/**
 * Setzt den Browser-Tab-Titel auf "<titel> | Mitbring Party".
 * Ohne Titel (oder beim Verlassen der Seite) wird wieder der Standard-Titel gesetzt.
 */
export function useDocumentTitle(titel?: string): void {
  useEffect(() => {
    document.title = titel ? `${titel} | ${BASIS_TITEL}` : BASIS_TITEL;
    return () => {
      document.title = BASIS_TITEL;
    };
  }, [titel]);
}
