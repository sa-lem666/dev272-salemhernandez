import { supabase } from "@/lib/supabase";

export type FlashCardSet = {
  id: string;
  title: string;
  subject: string;
  description: string;
  notes?: string;
};

export type NewSet = Omit<FlashCardSet, "id" | "created_at">;

export async function fetchSets(): Promise<FlashCardSet[]> {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  //throw new Error("Simulated failure");
  return data;
}

export async function fetchSet(id: string): Promise<FlashCardSet | null> {
  const { data, error } = await supabase
    .from("flashcards")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createSet(input: NewSet): Promise<FlashCardSet> {
  const { data, error } = await supabase
    .from("flashcards")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data;
}
