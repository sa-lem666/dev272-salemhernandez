import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

// This is the home screen (route "/").
export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello, welcome to your flashcard library!
      </Text>

      <View style={styles.row}>
        <TextInput placeholder="Search flashcard library" />

        <Pressable onPress={() => console.log("Search")}>
          <Text>Search</Text>\
        </Pressable>
      </View>

      <Text></Text>
    </View>
  );
}

function Header() {
  const [query, setQuery] = useState<string>("");

  return <View></View>;
}

function FlashCardSetRow() {
  return <View></View>;
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 8 },
  card: { padding: 12, borderRadius: 8 },
  cardMain: {},
  cardTitle: {},
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
