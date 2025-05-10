import type { Route } from "./+types/home";
import { Box, InputAdornment, TextField } from "@mui/material";
import TopMenu from "~/components/topMenu";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "10vh"
        }}
      >
        <TopMenu />
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "90vh"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
