import { FlashCardSet, flashcardsets } from "@/data/flashcardset";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// This is the home screen (route "/").
export default function Index() {
  return (
    <FlatList
      data={flashcardsets}
      keyExtractor={(f) => f.id}
      renderItem={({ item }) => <FlashcardRow flashcardsets={item} />}
      ListHeaderComponent={<Header />}
      contentContainerStyle={styles.list}
    />
  );
}

function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello, welcome to your flashcard library!
      </Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Search flashcard library"
        />

        <Pressable style={styles.button} onPress={() => console.log("Search")}>
          <Text>Search</Text>
        </Pressable>
      </View>
    </View>
  );
}

function FlashcardRow({ flashcardsets }: { flashcardsets: FlashCardSet }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardMain}>
        <Text style={styles.cardTitle}>{flashcardsets.name}</Text>
        <Text style={styles.cardSub}>{flashcardsets.subject}</Text>
      </View>

      <Text style={styles.cardSub}></Text>
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
  cardMain: {},
  cardTitle: {},
  cardSub: {},
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 20,
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
  input: {},
  button: {},
});
