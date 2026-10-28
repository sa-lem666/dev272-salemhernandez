import { fetchSets } from "@/api/sets";
import { FlashcardRow } from "@/components/FlashcardRow";
import { useRecents } from "@/context/RecentsContext";
import { usePalette } from "@/hooks/usePalette";
import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function recentSets() {
  const c = usePalette();
  const { recents } = useRecents();

  const {
    data: allSets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["flashcards"],
    queryFn: fetchSets,
  });

  const recentFlashcardSets = allSets.filter((f) => recents.includes(f.id));

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Could not load recent sets.</Text>
      </View>
    );
  }

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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
