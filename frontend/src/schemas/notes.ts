import * as yup from "yup";

export const schema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().required(),
    tags: yup.string().optional(),
    reminder_date: yup
      .string()
      .transform((v) => v || null)
      .nullable()
      .notRequired(),
    status: yup.string().oneOf(["", "green", "yellow", "red"]).notRequired(),
  })
  .required();

export type NoteInput = yup.InferType<typeof schema>;
