import { Palette } from "@/constants/colors";
import { FlashCardSet } from "@/data/flashcardset";
import { StyleSheet, Text, View } from "react-native";

export function FlashcardRow({
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
  card: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
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
});
