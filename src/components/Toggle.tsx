import { useState } from "react";
import { Pressable } from "react-native";

export default function Toggle() {
  const [on, setOn] = useState(false);

  return <Pressable onPress={() => setOn((prev) => !prev)}></Pressable>;
}
