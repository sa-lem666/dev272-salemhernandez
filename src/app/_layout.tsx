// Root layout. Every screen file inside src/app/ is a route.

import ThemeToggle from "@/components/ThemeToggle";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

// Week 3 replaces this with Stack + Tabs layouts.
export default function RootLayout() {
  const scheme = useColorScheme();

  return (
    <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Flashcard App",
            headerRight: () => <ThemeToggle />,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
