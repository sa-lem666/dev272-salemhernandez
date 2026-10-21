import { createContext, useContext, useState, type ReactNode } from "react";

type RecentsContextValue = {
  recents: string[]; // ids ordered by most recent first
  addRecent: (id: string) => void;
  removeRecent: (id: string) => void;
  clearRecents: () => void;
  isRecent: (id: string) => boolean;
};

export const RecentsContext = createContext<RecentsContextValue | null>(null);

const maxRecents = 10; //caps how many are in recents tab

export function RecentsProvider({ children }: { children: ReactNode }) {
  const [recents, setRecents] = useState<string[]>([]);

  const addRecent = (id: string) => {
    setRecents((current) => {
      const filteredRecents = current.filter((f) => f !== id);
      return [id, ...filteredRecents].slice(0, maxRecents);
    });
  };
  const removeRecent = (id: string) => {
    setRecents((current) => current.filter((f) => f !== id));
  };

  const clearRecents = () => {
    setRecents([]);
  };

  const isRecent = (id: string) => recents.includes(id);

  return (
    <RecentsContext.Provider
      value={{ recents, addRecent, removeRecent, clearRecents, isRecent }}
    >
      {children}
    </RecentsContext.Provider>
  );
}

export function useRecents() {
  const ctx = useContext(RecentsContext);
  if (!ctx) throw new Error("useRecents must be used inside RecentsProvider");
  return ctx;
}
