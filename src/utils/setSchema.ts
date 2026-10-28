import { z } from "zod";

export const setSchema = z.object({
  title: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
  notes: z.string().optional(),
});

export type SetFormData = z.infer<typeof setSchema>;

export const DEFAULT_SET_VALUES: SetFormData = {
  title: "",
  subject: "",
  description: "",
  notes: "",
};
