// Root layout. Every screen file inside src/app/ is a route.

import { FavoritesProvider } from "@/context/FavoritesContext";
import { RecentsProvider } from "@/context/RecentsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

// Week 3 replaces this with Stack + Tabs layouts.
export default function RootLayout() {
  const scheme = useColorScheme();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, //1 minute
        retry: 1,
      },
    },
  });

  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ThemeProvider>
  );
}
