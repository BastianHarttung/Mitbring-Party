export const datumZuLocalString = (datum: string) => {
  return new Date(datum).toLocaleDateString("de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  );
};