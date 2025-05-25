// import type { T } from "node_modules/react-router/dist/development/route-data-C12CLHiN.mjs";

import type { LatLngTuple } from "leaflet";

export type ApiResponse<T> = {
  statucCode: number;
  message: string;
  data: T;
  error: string;
};

export type Category = {
  _id: string;
  name: string;
};

export type Placemark = {
  _id?: string;
  name: string;
  address: string;
  title: string;
  categories: string[];
  openh: string;
  description: string;
  views?: { date: string; count: number }[];
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  images: string[];
};

export type WeatherItem = {
  time: string;
  temp: number;
  humidity: number;
  wind: number;
  rain: number;
};
