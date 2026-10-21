export type SetForm = {
  name: string;
  subject: string;
  description: string;
  notes?: string;
};

export type SetErrors = Partial<Record<keyof SetForm, string>>;

export const DESCRIPTION_MAX = 200;
export const NOTES_MAX = 200;

export function validateSet(form: SetForm): SetErrors {
  const errors: SetErrors = {};

  const name = form.name.trim();
  if (!name) errors.name = "Name is required.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";

  if (!form.subject.trim()) errors.subject = "Subject is required.";
  if (!form.description.trim()) errors.description = "Description is required.";

  if (form.description.length > DESCRIPTION_MAX)
    errors.description = "Description must be less than 200 characters.";

  if (form.notes)
    if (form.notes.length > NOTES_MAX)
      errors.notes = "Notes must be less than 200 characters.";

  return errors;
}
