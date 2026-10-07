import { FlashCardSet, flashcardsets } from "@/data/flashcardset";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { colors, Palette } from "./constants/colors";

// This is the home screen (route "/").
export default function Index() {
  const c = colors[useColorScheme() === "dark" ? "dark" : "light"];

  return (
    <FlatList
      data={flashcardsets}
      keyExtractor={(f) => f.id}
      renderItem={({ item }) => <FlashcardRow flashcardsets={item} c={c} />}
      ListHeaderComponent={<Header c={c} />}
      contentContainerStyle={styles.list}
    />
  );
}

function Header({ c }: { c: Palette }) {
  const [query, setQuery] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: c.text }]}>
        Hello, Welcome To Your Flashcard Library!
      </Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { borderColor: c.border, color: c.text }]}
          placeholder="Search flashcard library"
          placeholderTextColor={c.muted}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          returnKeyType="search"
        />

        <Pressable
          style={[styles.button, { backgroundColor: c.primary }]}
          onPress={() => console.log("Search:", query)} //Terminal should show the search action and what was searched
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
      <Text style={{ color: c.muted }}>{query.length} characters</Text>
    </View>
  );
}

function FlashcardRow({
  flashcardsets,
  c,
}: {
  flashcardsets: FlashCardSet;
  c: Palette;
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: c.card, borderColor: c.cardBorder },
      ]}
    >
      <View style={styles.cardMain}>
        <Text style={[styles.cardTitle, { color: c.text }]}>
          {flashcardsets.name}
        </Text>
        <Text style={[styles.cardSub, { color: c.muted }]}>
          {flashcardsets.subject}
        </Text>
      </View>

      {/* <Text style={[styles.cardSub, { color: c.muted }]}></Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 8,
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
});
