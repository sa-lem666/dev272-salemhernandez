import { FlashCardSet } from "@/data/flashcardset";

export type NewSet = Omit<FlashCardSet, "id">;

const DELAY_MS = 1200;

export async function saveSet(input: NewSet): Promise<FlashCardSet> {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

  if (input.name.toLowerCase() === "fail") {
    throw new Error("Simulated network failure");
  }

  return { id: Date.now().toString(), ...input };
}
