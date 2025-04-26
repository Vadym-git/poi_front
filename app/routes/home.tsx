import type { Route } from "./+types/home";
import { Box, InputAdornment, TextField } from "@mui/material";
import SinglePoi from "./singlePoi";
import TopMenu from "~/components/topMenu";
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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <TopMenu/>
      <SinglePoi />
    </Box>
  );
}
