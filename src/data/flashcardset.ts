export type FlashCardSet = {
  id: string;
  name: string;
  subject: string;
  description: string;
};

export const flashcardsets: FlashCardSet[] = [
  {
    id: "1",
    name: "Japanese Kanji",
    subject: "Language",
    description: "Learn the basics of Japanese Kanji.",
  },
  {
    id: "2",
    name: "Linux Distributions",
    subject: "Networking",
    description: "Explore various Linux distributions and their features.",
  },
  {
    id: "3",
    name: "Spanish Verb Conjugations",
    subject: "Language",
    description: "Study Spanish verb conjugations for effective communication.",
  },
  {
    id: "4",
    name: "US Presidents",
    subject: "History",
    description: "Memorize the names and terms of US Presidents.",
  },
  {
    id: "5",
    name: "Periodic Table Elements",
    subject: "Science",
    description:
      "Learn the elements of the periodic table and their properties.",
  },
  {
    id: "6",
    name: "Country Capitals",
    subject: "Geography",
    description: "Test your knowledge of world capitals.",
  },
  {
    id: "7",
    name: "React Components",
    subject: "Computer Science",
    description: "Understand the basics of React components and their usage.",
  },
  {
    id: "8",
    name: "Math Formulas",
    subject: "Mathematics",
    description: "Memorize important math formulas for quick reference.",
  },
];
