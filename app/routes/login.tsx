import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from "@toolpad/core/SignInPage";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { login } from "~/web_api/apiAxios";
import { useAuth } from "../contexts/authContext";
import { NavLink, useNavigate } from "react-router";

const providers: AuthProvider[] = [
  { id: "credentials", name: "Email and Password" },
  { id: "google", name: "Google" },
];

export default function CombinedSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const signIn = async (
    provider: AuthProvider,
    formData?: FormData
  ): Promise<AuthResponse> => {
    if (provider.id === "credentials") {
      const email = formData?.get("email")?.toString().trim();
      const password = formData?.get("password")?.toString();

      if (!password || password.length < 8) {
        alert("Пароль має містити щонайменше 8 символів.");
        return { error: "Password too short" };
      }

      try {
        await login(email, password);
        alert("Success!");
        setIsLoggedIn(true);
        navigate("/");
        return { error: null };
      } catch (error) {
        console.error("Login failed:", error);
        return { error: "Login failed" };
      }
    }

    // OAuth providers (e.g., Google)
    if (provider.id === "google") {
      window.location.href = `http://localhost:8000/auth/google`; // Replace with your actual OAuth endpoint
      return { error: null }; // Note: real redirect happens before this returns
    }

    return { error: "Unknown provider" };
  };

  return (
    <AppProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          textAlign: "center",
        }}
      >
        <SignInPage
          signIn={signIn}
          providers={providers}
          slotProps={{
            emailField: { autoFocus: true },
            form: { noValidate: false },
          }}
        />
        <Box sx={{ margin: 1 }}>
          Not registered yet? <NavLink to="/registration">Register</NavLink>
        </Box>
      </Box>
    </AppProvider>
  );
}
