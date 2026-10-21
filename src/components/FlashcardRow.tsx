import { useRecents } from "@/context/RecentsContext";
import { FlashCardSet } from "@/data/flashcardset";
import { usePalette } from "@/hooks/usePalette";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function FlashcardRow({
  flashcardsets,
}: {
  flashcardsets: FlashCardSet;
}) {
  const c = usePalette();
  const router = useRouter();
  const { addRecent } = useRecents();

  return (
    <Pressable
      onPress={() => {
        addRecent(flashcardsets.id);
        router.push({
          pathname: "/flashcardsets/[id]",
          params: { id: flashcardsets.id },
        });
      }}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: c.card, borderColor: c.cardBorder },
        pressed && styles.pressed,
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
    </Pressable>
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
  pressed: {
    opacity: 0.7,
  },
});
