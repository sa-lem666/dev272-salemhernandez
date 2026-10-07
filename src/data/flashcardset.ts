// src/data/places.ts
export type FlashCardSet = {
  id: string;
  name: string;
  subject: string;
};

export const flashcardsets: FlashCardSet[] = [
  { id: "1", name: "Japanese Kanji", subject: "Language" },
  { id: "2", name: "Linux Distributions", subject: "Networking" },
  { id: "3", name: "Spanish Verb Conjugations", subject: "Language" },
  { id: "4", name: "US Presidents", subject: "History" },
  { id: "5", name: "Periodic Table Elements", subject: "Science" },
  { id: "6", name: "Country Capitals", subject: "Geography" },
  { id: "7", name: "React Components", subject: "Computer Science" },
  { id: "8", name: "Math Formulas", subject: "Mathematics" },
  // ...at least 8 for the assignment
];
