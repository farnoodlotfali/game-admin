import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  //   index("routes/home.tsx"),
  //   route("about", "routes/about.tsx"),
  layout("layouts/panel-layout.tsx", [index("routes/home.tsx")]),
  layout("layouts/auth-layout.tsx", [route("about", "routes/about.tsx")]),
] satisfies RouteConfig;
