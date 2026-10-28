import { FlashcardRow } from "@/components/FlashcardRow";
import { ErrorView, LoadingView } from "@/components/StatusView";
import { useFavorites } from "@/context/FavoritesContext";
import { usePalette } from "@/hooks/usePalette";
import { useSets } from "@/hooks/useSets";
import { FlatList, StyleSheet, Text } from "react-native";

export default function Favorites() {
  const c = usePalette();
  const { favorites } = useFavorites();

  const { data: flashcards, isPending, isError, error, refetch } = useSets();

  const favoriteFlashcardSets = flashcards?.filter((f) =>
    favorites.includes(f.id),
  );

  if (isPending) return <LoadingView />;
  if (isError)
    return <ErrorView message={error.message} onRetry={() => refetch} />;

  return (
    <FlatList
      data={favoriteFlashcardSets}
      keyExtractor={(f) => f.id}
      renderItem={({ item }) => <FlashcardRow flashcardsets={item} />}
      ListHeaderComponent={
        <Text style={[styles.title, { color: c.text }]}>
          Your Favorite Sets
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
