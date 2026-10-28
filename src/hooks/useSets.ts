import { fetchSet, fetchSets } from "@/api/sets";
import { useQuery } from "@tanstack/react-query";

export function useSets() {
  return useQuery({ queryKey: ["flashcards"], queryFn: fetchSets });
}

export function useSet(id: string) {
  return useQuery({
    queryKey: ["flashcards", id],
    queryFn: () => fetchSet(id),
    enabled: !!id,
  });
}
