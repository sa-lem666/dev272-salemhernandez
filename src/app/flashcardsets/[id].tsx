import { ErrorView, LoadingView } from "@/components/StatusView";
import { useFavorites } from "@/context/FavoritesContext";
import { usePalette } from "@/hooks/usePalette";
import { useSet } from "@/hooks/useSets";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FlashcardSetDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = usePalette();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: flashcards, isPending, isError, error, refetch } = useSet(id);

  if (isPending) return <LoadingView />;
  if (isError)
    return <ErrorView message={error.message} onRetry={() => refetch} />;

  if (!flashcards) {
    return (
      <View style={styles.screen}>
        <Stack.Screen options={{ title: "Not Found" }} />
        <View
          style={
            (styles.card,
            { backgroundColor: c.card, borderColor: c.cardBorder })
          }
        >
          <Text style={[styles.name, { color: c.text }]}>Not Found</Text>
          <Text style={{ color: c.muted }}>No Flashcard Set with ID: {id}</Text>
        </View>
      </View>
    );
  }

  const favorite = isFavorite(flashcards.id);

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: flashcards.title }} />

      <View
        style={[
          styles.card,
          { backgroundColor: c.card, borderColor: c.cardBorder },
        ]}
      >
        <View style={[styles.badge, { backgroundColor: c.primary }]}>
          <Text style={[styles.badgeText]}>{flashcards.id}</Text>
        </View>

        <Text style={[styles.name, { color: c.text }]}>{flashcards.title}</Text>

        <View style={styles.infoRow}>
          <MaterialIcons name="subject" size={24} color={c.muted} />

          <Text style={[styles.infoText, { color: c.muted }]}>
            {flashcards.subject}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="description" size={24} color={c.muted} />

          <Text style={[styles.infoText, { color: c.muted }]}>
            {flashcards.description}
          </Text>
        </View>

        {flashcards.notes ? (
          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { color: c.muted }]}>
              {flashcards.notes}
            </Text>
          </View>
        ) : null}

        <View style={[styles.divider, { backgroundColor: c.cardBorder }]} />

        <Pressable
          onPress={() => toggleFavorite(flashcards.id)}
          style={({ pressed }) => [
            styles.favButton,
            { borderColor: c.primary, opacity: pressed ? 0.7 : 1 },
            favorite && { backgroundColor: c.primary },
          ]}
        >
          <Ionicons
            name={favorite ? "star" : "star-outline"}
            size={18}
            color={favorite ? "#fff" : c.primary}
          />

          <Text
            style={[styles.favText, { color: favorite ? "#fff" : c.primary }]}
          >
            {favorite ? "Favorited" : "Add to Favorites"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
  favButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  favText: {
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    width: "100%",
  },
});
