import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { Box } from "@mui/material";
import { login } from "~/web_api/apiAxios";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/authContext";

// preview-start
const providers = [{ id: "credentials", name: "Email and Password" }];
// preview-end

// const { setIsLoggedIn } = useAuth();

const signIn = async (
  provider: AuthProvider,
  formData: FormData,
  setIsLoggedIn,
  navigate: ReturnType<typeof useNavigate>
) => {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!password || password.length < 8) {
    alert("Пароль має містити щонайменше 8 символів.");
    return;
  }

  try {
    await login(email, password);
    alert("Success!");
    setIsLoggedIn(true);
    navigate("/");
  } catch (error) {
    console.error("Login failed:", error);
    alert("Can't login");
  }
};

export default function CredentialsSignInPage() {
  let navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        border: "solid red 4px",
        textAlign: "center",
      }}
    >
      <SignInPage
        sx={{
          minHeight: 0,
        }}
        signIn={(provider, formData) =>
          signIn(provider, formData, setIsLoggedIn, navigate)
        }
        providers={providers}
        slotProps={{
          emailField: { autoFocus: true },
          form: { noValidate: false },
        }}
      />
      <Box
        sx={{
          margin: 1,
        }}
      >
        Not registret yet? <NavLink to="">Regestration</NavLink>
      </Box>
    </Box>
  );
}
