import { usePalette } from "@/hooks/usePalette";
import { SetForm, validateSet } from "@/utils/validateSet";
import { ReactNode, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useFlashcardSets } from "@/context/FlashcardSetsContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const EMPTY_FORM: SetForm = {
  name: "",
  subject: "",
  description: "",
  notes: "",
};

type Touched = Partial<Record<keyof SetForm, boolean>>;

export default function addSet() {
  const router = useRouter();
  const { saveNewSet } = useFlashcardSets();
  const c = usePalette();
  const [form, setForm] = useState<SetForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<Touched>({});
  const [submitAttempted, setAttemptSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (submitting) return;
    Keyboard.dismiss();
    setAttemptSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const saved = await saveNewSet({
        name: form.name.trim(),
        subject: form.subject.trim(),
        description: form.description.trim(),
        notes: form.notes?.trim(),
      });
      Alert.alert("Saved", `${saved.name} was saved.`, [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (e) {
      console.warn("saveSet failed:", e);
      setSubmitError(
        "We could not save your flashcard set. Check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const errors = validateSet(form);

  const touch = (key: keyof SetForm) =>
    setTouched((current: any) => ({ ...current, [key]: true }));

  const errorFor = (key: keyof SetForm) =>
    touched[key] || submitAttempted ? errors[key] : undefined;

  const update = <K extends keyof SetForm>(key: K, value: SetForm[K]) =>
    setForm((current: any) => ({ ...current, [key]: value }));

  const inputStyle = (key: keyof SetForm) => [
    styles.input,
    { color: c.text, backgroundColor: c.card, borderColor: c.border },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Field label="Name">
          <TextInput
            style={inputStyle("name")}
            value={form.name}
            onChangeText={(t) => update("name", t)}
            placeholder="Set Name"
            placeholderTextColor={c.muted}
            autoCapitalize="words"
            returnKeyType="next"
            accessibilityLabel="Title"
          />
        </Field>

        <Field label="Subject">
          <TextInput
            style={inputStyle("subject")}
            value={form.subject}
            onChangeText={(t) => update("subject", t)}
            placeholder="Subject"
            placeholderTextColor={c.muted}
            autoCapitalize="words"
            returnKeyType="next"
            accessibilityLabel="Subject"
          />
        </Field>

        <Field label="Description">
          <TextInput
            style={inputStyle("description")}
            value={form.description}
            onChangeText={(t) => update("description", t)}
            placeholder="Description"
            placeholderTextColor={c.muted}
            autoCapitalize="words"
            returnKeyType="next"
            accessibilityLabel="Description"
          />
        </Field>

        <Field label="Notes">
          <TextInput
            style={inputStyle("notes")}
            value={form.notes}
            onChangeText={(t) => update("notes", t)}
            placeholder="Notes"
            placeholderTextColor={c.muted}
            autoCapitalize="words"
            returnKeyType="next"
            accessibilityLabel="Notes"
          />
        </Field>

        {submitError ? (
          <View
            style={[styles.banner, { borderColor: "red" }]}
            accessibilityRole="alert"
          >
            <Ionicons name="alert-circle-outline" size={20} color="red" />
            <Text style={[styles.bannerText, { color: "red" }]}>
              {submitError}
            </Text>
          </View>
        ) : null}

        <Pressable
          style={[styles.save, { backgroundColor: c.primary }]}
          disabled={submitting}
          onPress={handleSubmit}
        >
          {submitting ? <ActivityIndicator color="#fff" /> : null}
          <Text style={styles.saveText}>
            {submitting ? "Saving..." : submitError ? "Try again" : "Save"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

function Field({ label, error, hint, children }: FieldProps) {
  const c = usePalette();

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: c.text }]}>{label}</Text>
      {children}
      {error ? (
        <Text
          style={[styles.message, { color: "red" }]}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      ) : hint ? (
        <Text style={[styles.message, { color: c.muted }]}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
  },
  flex: {
    flex: 1,
  },
  form: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },
  field: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  message: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
  save: {
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
});
