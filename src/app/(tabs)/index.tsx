import { FlashcardRow } from "@/components/FlashcardRow";
import { ErrorView, LoadingView } from "@/components/StatusView";
import { colors, Palette } from "@/constants/colors";
import { useSets } from "@/hooks/useSets";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

// This is the home screen (route "/").
export default function Index() {
  const c = colors[useColorScheme() === "dark" ? "dark" : "light"];

  const [loading, setLoading] = useState(true);

  const {
    data: flashcardsets,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = useSets();

  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const q = query.trim().toLowerCase();
  const filtered = flashcardsets?.filter(
    (f) =>
      f.title?.toLowerCase().includes(q) ||
      f.subject?.toLowerCase().includes(q),
  );

  if (isPending) return <LoadingView />;
  if (isError)
    return <ErrorView message={error.message} onRetry={() => refetch} />;

  return (
    <View>
      <FlatList
        data={filtered}
        keyExtractor={(f) => f.id}
        renderItem={({ item }) => <FlashcardRow flashcardsets={item} />}
        ListHeaderComponent={
          <Header c={c} query={query} onChangeQuery={setQuery} />
        }
        ListEmptyComponent={
          <Text>
            {q
              ? "No flashcard sets match your search."
              : "No flashcard sets yet."}
          </Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        contentContainerStyle={styles.list}
      />
      <Pressable
        onPress={() => router.push("/add")}
        accessibilityRole="button"
        accessibilityLabel="Add flashcardset"
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: c.primary, opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <Ionicons name="add" size={40} color="white" />
      </Pressable>
    </View>
  );
}

type HeaderProps = {
  query: string;
  onChangeQuery: (query: string) => void;
  c: Palette;
};

function Header({ query, onChangeQuery, c }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: c.text }]}>
        Hello, Welcome To Your Flashcard Library!
      </Text>

      <View style={styles.row}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: c.cardBorder,
              color: c.text,
              backgroundColor: c.card,
            },
          ]}
          placeholder="Search flashcard library"
          placeholderTextColor={c.muted}
          value={query}
          onChangeText={onChangeQuery}
          autoCapitalize="none"
          returnKeyType="search"
        />

        <Pressable
          style={[styles.button, { backgroundColor: c.primary }]}
          onPress={() => onChangeQuery("")}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
      </View>
      <Text style={{ color: c.muted }}>{query.length} characters</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 8,
  },
  empty: {
    textAlign: "center",
    paddingVertical: 24,
  },
  card: {
    padding: 12,
    borderRadius: 8,
  },
  cardMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSub: {
    fontSize: 12,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  body: {
    fontSize: 16,
    textAlign: "center",
  },
  hint: {
    marginTop: 24,
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    bottom: -100,
    left: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
});
