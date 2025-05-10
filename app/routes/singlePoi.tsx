import { Box, Typography } from "@mui/material";
import Map from "../components/map";
import type { Route } from "./+types/singlePoi";
import { fetchPlacemarkDetails } from "../web_api/apiAxios";
import { useState } from "react";
import type { Placemark } from "~/web_api/types";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export function meta({ params }: Route.MetaArgs) {
  return [{ title: "POI World" }, { name: "POI World", content: "POI World" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const poi = await fetchPlacemarkDetails(params.poiId);
  return { poi };
}

export default function SinglePoi({ loaderData }: Route.ComponentProps) {
  const [poi, setPoi] = useState<Placemark | null>(loaderData.poi);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Ліва частина з текстом і прокруткою */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          height: "100%",
          padding: 2,
          boxSizing: "border-box",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          textAlign: "center",
          overflowY: "auto"
        }}
      >
        <Typography variant="h2">{poi?.name}</Typography>
        <img
          src={poi?.images[0]}
          width="100%"
          style={{ marginBottom: "20px" }}
        />
        <Typography variant="h5">{poi?.title}</Typography>
        <Typography variant="body1">
          {poi?.description}
        </Typography>


    <LineChart
    sx={{
      padding: 0,
      margin: 0,
      border: "solid red 1px"
    }}
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      height={300}
    />



      </Box>

      {/* Права частина (наприклад, карта та додаткові дані) */}
      <Box
        sx={{
          width: "20%",
          height: "100%",
          padding: 2,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          borderLeft: "2px solid gray",
        }}
      >
        <Box>
          <strong>Address</strong>
          <p>
            <div dangerouslySetInnerHTML={{ __html: poi?.address }} />
          </p>
        </Box>
        <Box>
          <strong>Opening hours</strong>
          <p>
            <div dangerouslySetInnerHTML={{ __html: poi?.address }} />
          </p>
        </Box>

        {/* Карта */}
        {poi && (
          <Map
            size={{ height: "100%", width: "100%" }}
            center={[poi.location.coordinates[1], poi.location.coordinates[0]]}
            markers={[poi]}
          />
        )}
      </Box>
    </Box>
  );
}
