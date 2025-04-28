import { FormSchema } from "@/schemas/form.yup";
import * as yup from "yup";

export type FormValues = yup.InferType<typeof FormSchema>;
