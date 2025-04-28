import * as yup from "yup";

export const FormSchema = yup
  .object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    address: yup.string().optional(),
    phone_number: yup
      .string()
      .required("Phone number is required")
      .matches(/^\+?[0-9\- ]+$/, "Invalid phone number format"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    birthday: yup
      .string()
      .optional()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  })
  .required();
