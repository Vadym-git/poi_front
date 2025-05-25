import {
  Badge,
  Box,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";
import Map from "../components/map";
import type { Route } from "./+types/singlePoi";
import {
  fetchPlacemarkDetails,
  fetchPlacemarks,
  updatePlacemark,
} from "../web_api/apiAxios";
import { useEffect, useState } from "react";
import type { Placemark, WeatherItem } from "~/web_api/types";
import { LineChart } from "@mui/x-charts/LineChart";
import { NavLink } from "react-router";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAuth } from "../contexts/authContext";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: "POI World" }, { name: "POI World", content: "POI World" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const poi = await fetchPlacemarkDetails(params.poiId);
  return { poi };
}

export default function SinglePoi({ loaderData }: Route.ComponentProps) {
  const [weather, setWeather] = useState<WeatherItem[]>();
  const [poi, setPoi] = useState<Placemark | null>(loaderData.poi);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [placemarks, setPlacemarks] = useState<Placemark[]>();

  const handleImageDel = (img: string) => async () => {
    if (!poi) return;
    const updatedImages = poi.images.filter((i) => i !== img);
    const updatedPlacemark = { ...poi, images: updatedImages };
    try {
      if (!poi._id) return;
      const updated = await updatePlacemark(poi._id, updatedPlacemark);
      setPoi(updated);
      console.log("✅ Image removed and placemark updated");
    } catch (error) {
      console.error("❌ Failed to update placemark:", error);
    }
  };

  useEffect(() => {
    const placemarks = async () => {
      try {
        const response = await fetchPlacemarks();
        const filtered = response.filter((p) =>
          p.categories.includes(poi?.categories[0] || "")
        );
        setPlacemarks(filtered);
      } catch (error) {
        console.error("❌ Failed to fetch or filter placemarks:", error);
      }
    };

    placemarks(); // ✅ Важливо викликати функцію
  }, [poi]);

  useEffect(() => {
    const fetchWeather = async () => {
      const key = "7c633b3dd9dc77c5d2b492576369449c";
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${poi?.location.coordinates[1]}&lon=${poi?.location.coordinates[0]}&units=metric&appid=${key}`;
        const response = await axios.get(url);
        const raw = response.data.list;

        // Підготуємо дані на 8 відміток (~24 год)
        const prepared = raw.slice(0, 8).map((item: any) => ({
          time: new Date(item.dt_txt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temp: item.main.temp,
          humidity: item.main.humidity,
          wind: item.wind.speed,
          rain: item.rain?.["3h"] || 0, // якщо є дощ, беремо його
        }));

        setWeather(prepared);
      } catch (err: any) {
        console.error("❌ Failed to fetch weather:", err);
      }
    };

    if (poi?.location?.coordinates) {
      fetchWeather();
    }
  }, []);

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
          overflowY: "auto",
        }}
      >
        <Badge
          invisible={!isLoggedIn}
          color="primary"
          sx={{ display: "flex", justifyContent: "center" }}
          badgeContent={
            <NavLink to={`/add-placemark/${poi?._id}`}>
              <SettingsOutlinedIcon sx={{ fontSize: 20, color: "orange" }} />
            </NavLink>
          }
        >
          <Typography variant="h2" sx={{ textTransform: "capitalize" }}>
            {poi?.name}
          </Typography>
        </Badge>
        <img
          src={poi?.images[0]}
          width="100%"
          style={{ marginBottom: "20px" }}
        />

        <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
          {poi?.title}
        </Typography>

        <Typography variant="body1">{poi?.description}</Typography>
        <BarChart
          xAxis={[
            {
              data: weather?.map((w) => w.time) ?? [],
              scaleType: "band",
            },
          ]}
          series={[
            { data: weather?.map((w) => w.temp) ?? [], label: "Temp (°C)" },
            {
              data: weather?.map((w) => w.humidity) ?? [],
              label: "Humidity (%)",
            },
            { data: weather?.map((w) => w.wind) ?? [], label: "Wind (m/s)" },
            { data: weather?.map((w) => w.rain) ?? [], label: "Rain (mm)" },
          ]}
          height={300}
        />

        <ImageList sx={{ width: "auto", height: "auto", overflow: "visible" }}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">Gallery</ListSubheader>
          </ImageListItem>
          {poi?.images.map((item) => (
            <ImageListItem key={item}>
              <img
                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${item}?w=248&fit=crop&auto=format`}
                alt={poi.name}
                loading="lazy"
              />
              <ImageListItemBar
                title={poi.name}
                subtitle={poi.title}
                sx={{
                  "& .MuiImageListItemBar-title": {
                    textTransform: "capitalize",
                  },
                  "& .MuiImageListItemBar-subtitle": {
                    textTransform: "capitalize",
                  },
                }}
                actionIcon={
                  isLoggedIn && (
                    <Button
                      onClick={handleImageDel(item)}
                      style={{
                        color: "rgba(255, 255, 255, 0.54)",
                        marginRight: 16,
                      }}
                      aria-label={`info about ${poi.title}`}
                    >
                      <DeleteOutlinedIcon />
                    </Button>
                  )
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Typography variant="h6">Places in the same category</Typography>
        <Box
          sx={{
            height: "600px",
            minHeight: "400px",
            width: "100%",
            marginBottom: 2,
          }}
        >
          {poi && (
            <Map
              size={{ height: "100%", width: "100%" }}
              center={
                poi?.location?.coordinates?.length === 2
                  ? [poi.location.coordinates[1], poi.location.coordinates[0]]
                  : [50.45, 30.52]
              }
              markers={placemarks}
            />
          )}
        </Box>
        <Typography variant="h6">Visits</Typography>
        <LineChart
          sx={{
            padding: 0,
            margin: 0,
            border: "solid red 1px",
          }}
          yAxis={[
            {
              label: "Views",
            },
          ]}
          xAxis={[
            {
              data: poi?.views.map((v) =>
                new Date(v.date).toLocaleDateString("en-IE")
              ),
              scaleType: "point",
              label: "Days",
            },
          ]}
          series={[{ data: poi?.views.map((v) => v.count) }]}
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
            <div dangerouslySetInnerHTML={{ __html: poi?.openh }} />
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
