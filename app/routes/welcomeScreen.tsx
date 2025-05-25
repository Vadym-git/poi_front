import {
  Badge,
  Box,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Map from "../components/map";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import type { Route } from "./+types/welcomeScreen";
import { fetchPlacemarks, fetchAllCategories } from "../web_api/apiAxios";
import { useEffect, useState } from "react";
import type { Placemark, ApiResponse, Category } from "../web_api/types";
import { NavLink } from "react-router";
import { useAuth } from "../contexts/authContext";
import InfoIcon from "@mui/icons-material/Info";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: "POI World" }, { name: "POI World", content: "POI World" }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const pois: Placemark[] = await fetchPlacemarks();
  return { pois };
}

export default function WelcomeScreen({ loaderData }: Route.ComponentProps) {
  const [poi, setPoi] = useState<Placemark[]>(loaderData.pois);
  const [categories, setCategories] = useState<Category[]>([]);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleCategoryClick = (id: string) => async () => {
    console.log("clicked category:", id);
    try {
      const response = await fetchPlacemarks();
      if (id == "all") {
        setPoi(response);
        return;
      }
      const filtered = response.filter((p) => p.categories.includes(id));
      setPoi(filtered);
    } catch (error) {
      console.error("❌ Failed to fetch or filter placemarks:", error);
    }
  };

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetchAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch categories:", error);
      }
    }

    loadCategories();
  }, []);

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
          justifyContent: "space-evenly",
        }}
      >
        <Box key="all">
          <Badge
            invisible={!isLoggedIn}
            badgeContent={
              <NavLink to={`/add-category/`}>
                <SettingsOutlinedIcon sx={{ fontSize: 20, color: "orange" }} />
              </NavLink>
            }
          >
            <Button
              onClick={handleCategoryClick("all")}
              sx={{ border: "solid lightblue 1px" }}
            >
              ALL
            </Button>
          </Badge>
        </Box>
        {categories.map((category) => (
          <Box key={category._id}>
            <Badge
              invisible={!isLoggedIn}
              badgeContent={
                <NavLink to={`/add-category/${category._id}`}>
                  <SettingsOutlinedIcon
                    sx={{ fontSize: 20, color: "orange" }}
                  />
                </NavLink>
              }
            >
              <Button
                onClick={handleCategoryClick(category._id)}
                sx={{ border: "solid lightblue 1px" }}
              >
                {category.name}
              </Button>
            </Badge>
          </Box>
        ))}
      </Box>
      <Box sx={{ width: "100%" }}>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <Tab label="Map" />
          <Tab label="Gallery" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {tabIndex === 0 && (
            <Box
              sx={{
                width: "100%",
                height: "69vh",
              }}
            >
              <Map
                size={{ height: "100%", width: "100%" }}
                center={
                  poi?.[0]?.location?.coordinates?.length === 2
                    ? [
                        poi[0].location.coordinates[1],
                        poi[0].location.coordinates[0],
                      ]
                    : [50.45, 30.52]
                }
                markers={poi}
              />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box sx={{ width: "100%", height: "69vh", overflowY: "scroll" }}>
              <ImageList sx={{ width: "auto", height: "auto" }}>
                <ImageListItem key="Subheader" cols={2}>
                  <ListSubheader component="div">Gallery</ListSubheader>
                </ImageListItem>
                {poi.map((item) => (
                  <ImageListItem key={item._id}>
                    <img
                      srcSet={`${item?.images[0]}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item?.images[0]}?w=248&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.name}
                      subtitle={item.title}
                      sx={{
                        "& .MuiImageListItemBar-title": {
                          textTransform: "capitalize",
                        },
                        "& .MuiImageListItemBar-subtitle": {
                          textTransform: "capitalize",
                        },
                      }}
                      actionIcon={
                        <NavLink
                          to={`/${item._id}`}
                          style={{
                            color: "rgba(255, 255, 255, 0.54)",
                            marginRight: 16,
                          }}
                          aria-label={`info about ${item.title}`}
                        >
                          <InfoIcon />
                        </NavLink>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];
