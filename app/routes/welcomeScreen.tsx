import { Box, Button } from "@mui/material";
import Map from "../components/map";
import type { Route } from "./+types/welcomeScreen";
import { fetchPlacemarks } from "../web_api/apiAxios"
import { useState } from "react";
import { type Placemark, type ApiResponse } from "../web_api/types"

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "POI World" },
    { name: "POI World", content: "POI World" },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const pois: Placemark[] = await fetchPlacemarks();
    console.log(pois);
    return { pois};
}

export default function WelcomeScreen({loaderData}: Route.ComponentProps) {
  const [poi, setPoi] = useState<Placemark[]>(loaderData.pois);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Open POIs - N1 in the World</h1>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          margin: "10px 0",
          flexWrap: "wrap",
          justifyContent: "space-evenly"
        }}
      >
        <Button>Category</Button>
        <Button>Category</Button>
        <Button>Category</Button>
        <Button>Category</Button>
        <Button>Category</Button>
        <Button>Category</Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "500px",
        }}
      >
        <Map
          size={{ height: "100%", width: "100%" }}
          center={[poi[0].location.coordinates[1], poi[0].location.coordinates[0]]}
          markers={poi}
        />
      </Box>
    </Box>
  );
}
