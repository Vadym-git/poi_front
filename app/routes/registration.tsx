import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { register as registerUser } from "../web_api/apiAxios";
type FormData = {
  email: string;
  password: string;
  password2: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await registerUser(data.email, data.password);
      console.log("✅ Registration successful:", response.data);
    } catch (error: any) {
      console.error(
        "❌ Registration failed:",
        error.response?.data || error.message
      );
    }
  };

  const password = watch("password");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 460,
        width: "360px",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Registration
      </Typography>

      <TextField
        label="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
      />

      <TextField
        label="Password"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
      />

      <TextField
        label="Confirm Password"
        type="password"
        {...register("password2", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
        error={!!errors.password2}
        helperText={errors.password2?.message}
        fullWidth
      />

      <Button type="submit" variant="contained" fullWidth>
        Register
      </Button>
    </Box>
  );
}
