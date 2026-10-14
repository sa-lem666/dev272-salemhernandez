import { FlashcardRow } from "@/components/FlashcardRow";
import { useFavorites } from "@/context/FavoritesContext";
import { flashcardsets } from "@/data/flashcardset";
import { usePalette } from "@/hooks/usePalette";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Favorites() {
  const c = usePalette();
  const { favorites } = useFavorites();
  const favoriteFlashcardSets = flashcardsets.filter((f) =>
    favorites.includes(f.id),
  );

  if (favoriteFlashcardSets.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={{ color: c.muted }}>No favorites yet</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={favoriteFlashcardSets}
      keyExtractor={(f) => f.id}
      renderItem={({ item }) => <FlashcardRow flashcardsets={item} />}
      ListHeaderComponent={
        <Text style={[styles.title, { color: c.text }]}>
          Your Favorite Flashcard Sets
        </Text>
      }
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
