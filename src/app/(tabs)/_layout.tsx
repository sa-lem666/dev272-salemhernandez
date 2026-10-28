import ThemeToggle from "@/components/ThemeToggle";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerRight: ThemeToggle }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Flashcard Library",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons
              name="my-library-books"
              color={String(color)}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="star-box-multiple"
              color={String(color)}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="recentSets"
        options={{
          title: "Recent Sets",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="archive-clock"
              color={String(color)}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
