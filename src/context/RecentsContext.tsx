import { loadJson, saveJson, STORAGE_KEYS } from "@/lib/storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type RecentsContextType = {
  recents: string[];
  addRecent: (id: string) => void;
  clearRecents: () => void;
};

const RecentsContext = createContext<RecentsContextType | undefined>(undefined);

export function RecentsProvider({ children }: { children: React.ReactNode }) {
  const [recents, setRecents] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true); // stops weird glitching due to constant refreshing, that was weird to encounter

  useEffect(() => {
    loadJson<string[]>(STORAGE_KEYS.recents, []).then((savedRecents) => {
      setRecents(savedRecents);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    saveJson(STORAGE_KEYS.recents, recents);
  }, [recents, isLoaded]);

  const addRecent = (id: string) => {
    setRecents((current) => {
      // Prevent redundant state updates if the item is already first in line
      if (current[0] === id) return current;

      const filtered = current.filter((item) => item !== id);
      return [id, ...filtered];
    });
  };

  const clearRecents = () => {
    setRecents([]);
  };

  return (
    <RecentsContext.Provider value={{ recents, addRecent, clearRecents }}>
      {children}
    </RecentsContext.Provider>
  );
}

export function useRecents() {
  const context = useContext(RecentsContext);
  if (!context) {
    throw new Error("useRecents must be used within a RecentsProvider");
  }
  return context;
}
