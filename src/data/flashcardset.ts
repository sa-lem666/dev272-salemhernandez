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
  // ...at least 8 for the assignment
];
