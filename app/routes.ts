import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/home.tsx", [
    index("routes/welcomeScreen.tsx"),
    route("login", "routes/login.tsx"),
    route("registration", "routes/registration.tsx"),
    route("add-category/:catId?", "routes/addCategory.tsx"),
    route("add-placemark/:poiId?", "routes/addPlacemark.tsx"),
    route(":poiId", "routes/singlePoi.tsx"),
  ]),
] satisfies RouteConfig;
