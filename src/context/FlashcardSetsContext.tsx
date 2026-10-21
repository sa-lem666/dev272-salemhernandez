import { saveSet } from "@/api/sets";
import {
    FlashCardSet,
    flashcardsets as initialSets,
} from "@/data/flashcardset";
import { createContext, useContext, useState, type ReactNode } from "react";

type FlashcardSetsContextType = {
  flashcardsets: FlashCardSet[];
  saveNewSet: (newSet: Omit<FlashCardSet, "id">) => Promise<FlashCardSet>;
};

const FlashcardSetsContext = createContext<FlashcardSetsContextType | null>(
  null,
);

export function FlashcardSetsProvider({ children }: { children: ReactNode }) {
  const [flashcardsets, setFlashcardsets] =
    useState<FlashCardSet[]>(initialSets);

  const saveNewSet = async (newSetData: Omit<FlashCardSet, "id">) => {
    const saved = await saveSet(newSetData);
    setFlashcardsets((current) => [saved, ...current]);
    return saved;
  };

  return (
    <FlashcardSetsContext.Provider value={{ flashcardsets, saveNewSet }}>
      {children}
    </FlashcardSetsContext.Provider>
  );
}

export function useFlashcardSets() {
  const ctx = useContext(FlashcardSetsContext);
  if (!ctx)
    throw new Error(
      "useFlashcardSets must be used inside FlashcardSetsProvider",
    );
  return ctx;
}
