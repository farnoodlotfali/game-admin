import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

import { PAGE_URL } from "./constants/page-url";

export default [
  layout("layouts/panel-layout.tsx", [
    index("routes/games.tsx"),
    route(PAGE_URL.publishers, "routes/publishers.tsx"),
    route(PAGE_URL.genres, "routes/genres.tsx"),
    route(PAGE_URL.platforms, "routes/platforms.tsx"),
  ]),
  layout("layouts/auth-layout.tsx", [
    route("login", "routes/login.tsx"),
    route("about", "routes/about.tsx"),
    route("test", "routes/test.tsx"),
  ]),
] satisfies RouteConfig;
