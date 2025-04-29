import * as yup from "yup";

export const FormSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    address: yup.string().notRequired(),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .matches(/^\+?[0-9\- ]+$/, "Invalid phone format"),
    email: yup.string().required("Email is required").email("Invalid email"),

    birthday: yup
      .string()
      .transform((v, o) => (o === "" ? null : v))
      .nullable()
      .notRequired()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Format must be YYYY-MM-DD"),
  })
  .required();

export type FormValues = yup.InferType<typeof FormSchema>;
