import { createContext, useContext, useState, type ReactNode } from "react";

type RecentsContextValue = {
  recents: string[]; // ids
  isRecent: (id: string) => boolean;
  toggleRecent: (id: string) => void;
};

export const RecentsContext = createContext<RecentsContextValue | null>(null);

export function RecentsProvider({ children }: { children: ReactNode }) {
  const [recents, setRecents] = useState<string[]>([]);

  const isRecent = (id: string) => recents.includes(id);
  const toggleRecent = (id: string) =>
    setRecents((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id],
    );

  return (
    <RecentsContext.Provider value={{ recents, isRecent, toggleRecent }}>
      {children}
    </RecentsContext.Provider>
  );
}

export function useRecents() {
  const ctx = useContext(RecentsContext);
  if (!ctx) throw new Error("useRecents must be used inside RecentsProvider");
  return ctx;
}
