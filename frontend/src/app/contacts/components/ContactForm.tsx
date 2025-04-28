"use client";

import { ContactFormProps } from "@/interfaces/form";
import { FormSchema } from "@/schemas/form.yup";
import { FormValues } from "@/types/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useForm, type Resolver } from "react-hook-form";

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const resolver = yupResolver(FormSchema) as unknown as Resolver<FormValues>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver,
    defaultValues: {
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      email: "",
      birthday: "",
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

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          size="large"
        >
          {isSubmitting ? "Creating…" : "Add Contact"}
        </Button>
      </Stack>
    </Box>
  );
}
