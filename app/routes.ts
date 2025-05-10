import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    index("routes/welcomeScreen.tsx"),
    route(":poiId", "routes/singlePoi.tsx")
]),
] satisfies RouteConfig;
