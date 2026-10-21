// Root layout. Every screen file inside src/app/ is a route.

import { FavoritesProvider } from "@/context/FavoritesContext";
import { FlashcardSetsProvider } from "@/context/FlashcardSetsContext";
import { RecentsProvider } from "@/context/RecentsContext";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

// Week 3 replaces this with Stack + Tabs layouts.
export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <FlashcardSetsProvider>
        <FavoritesProvider>
          <RecentsProvider>
            <StatusBar style="auto" />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="flashcardsets/[id]"
                options={{
                  title: "Flashcard App",
                  headerBackButtonDisplayMode: "minimal",
                }}
              />
              <Stack.Screen
                name="add"
                options={{
                  title: "Add Flashcard Set",
                  headerShown: false,
                  headerBackButtonDisplayMode: "minimal",
                }}
              />
            </Stack>
          </RecentsProvider>
        </FavoritesProvider>
      </FlashcardSetsProvider>
    </ThemeProvider>
  );
}
