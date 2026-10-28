import { usePalette } from "@/hooks/usePalette";
import { DEFAULT_SET_VALUES, SetFormData, setSchema } from "@/utils/setSchema";
import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
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

import { createSet } from "@/api/sets";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export default function addSet() {
  const router = useRouter();
  const c = usePalette();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetFormData>({
    resolver: zodResolver(setSchema),
    defaultValues: DEFAULT_SET_VALUES,
    mode: "onTouched",
  });

  const AddSet = useMutation({
    mutationFn: createSet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flashcards"] });
      router.back();
    },
    onError: (e) => Alert.alert("Could not save", e.message),
  });

  const onSubmit = (data: SetFormData) => {
    Keyboard.dismiss();
    AddSet.mutate({
      title: data.title.trim(),
      subject: data.subject.trim(),
      description: data.description.trim(),
      notes: data.notes?.trim(),
    });
  };

  const inputStyle = [
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
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Field label="Name" error={errors.title?.message}>
              <TextInput
                style={[styles.input, inputStyle]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Set Name"
                placeholderTextColor={c.muted}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </Field>
          )}
        />

        <Controller
          control={control}
          name="subject"
          render={({ field: { onChange, onBlur, value } }) => (
            <Field label="Subject" error={errors.subject?.message}>
              <TextInput
                style={[styles.input, inputStyle]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Subject"
                placeholderTextColor={c.muted}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </Field>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <Field label="Description" error={errors.description?.message}>
              <TextInput
                style={[styles.input, inputStyle]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Description"
                placeholderTextColor={c.muted}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </Field>
          )}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, onBlur, value } }) => (
            <Field label="Notes" error={errors.notes?.message}>
              <TextInput
                style={[styles.input, inputStyle]}
                value={value ?? ""}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Notes"
                placeholderTextColor={c.muted}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </Field>
          )}
        />

        {AddSet.isError ? (
          <View
            style={[styles.banner, { borderColor: "red" }]}
            accessibilityRole="alert"
          >
            <Ionicons name="alert-circle-outline" size={20} color="red" />
            <Text style={[styles.bannerText, { color: "red" }]}>
              We could not save your flashcard set. Check your connection and
              try again.
            </Text>
          </View>
        ) : null}

        <Pressable
          style={({ pressed }) => [
            styles.save,
            {
              backgroundColor: c.primary,
              opacity: AddSet.isPending ? 0.6 : pressed ? 0.8 : 1,
            },
          ]}
          disabled={AddSet.isPending}
          onPress={() => handleSubmit(onSubmit)()}
        >
          {AddSet.isPending ? <ActivityIndicator color="#fff" /> : null}
          <Text style={styles.saveText}>
            {AddSet.isPending
              ? "Saving..."
              : AddSet.isError
                ? "Try again"
                : "Save"}
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
