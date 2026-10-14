import { FlashcardRow } from "@/components/FlashcardRow";
import { useRecents } from "@/context/RecentsContext";
import { flashcardsets } from "@/data/flashcardset";
import { usePalette } from "@/hooks/usePalette";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function recentSets() {
  const c = usePalette();
  const { recents } = useRecents();
  const recentFlashcardSets = flashcardsets.filter((f) =>
    recents.includes(f.id),
  );

  if (recentFlashcardSets.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={{ color: c.muted }}>No recent sets</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={recentFlashcardSets}
      keyExtractor={(f) => f.id}
      renderItem={({ item }) => <FlashcardRow flashcardsets={item} />}
      ListHeaderComponent={
        <Text style={[styles.title, { color: c.text }]}>Your Recent Sets</Text>
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
