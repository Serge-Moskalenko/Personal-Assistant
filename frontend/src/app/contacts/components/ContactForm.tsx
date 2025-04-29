"use client";

import { FormSchema, FormValues } from "@/schemas/form.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

export interface ContactFormProps {
  initialValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
}

export default function ContactForm({
  initialValues,
  onSubmit,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(FormSchema),
    defaultValues: initialValues ?? {
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      email: "",
      birthday: null,
    },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          {...register("first_name")}
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
          fullWidth
        />
        <TextField
          label="Last Name"
          {...register("last_name")}
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
          fullWidth
        />
        <TextField
          label="Address"
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
          fullWidth
        />
        <TextField
          label="Phone Number"
          {...register("phone_number")}
          error={!!errors.phone_number}
          helperText={errors.phone_number?.message}
          fullWidth
        />
        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label="Birthday"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("birthday")}
          error={!!errors.birthday}
          helperText={errors.birthday?.message}
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save Contact"}
        </Button>
      </Stack>
    </Box>
  );
}
