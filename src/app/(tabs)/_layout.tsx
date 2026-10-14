import ThemeToggle from "@/components/ThemeToggle";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerRight: () => <ThemeToggle /> }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Flashcard Library",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="my-library-books" color={color} size={size} />
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
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="newSet"
        options={{
          title: "New Set",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="my-library-add" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
