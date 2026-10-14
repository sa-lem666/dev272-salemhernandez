import { colors } from "@/constants/colors";
import { useColorScheme } from "react-native";

export function usePalette() {
  return colors[useColorScheme() === "dark" ? "dark" : "light"];
}
