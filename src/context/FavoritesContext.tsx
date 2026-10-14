// src/context/FavoritesContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type FavoritesContextValue = {
  favorites: string[]; // ids
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const isFavorite = (id: string) => favorites.includes(id);
  const toggleFavorite = (id: string) =>
    setFavorites((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id],
    );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
