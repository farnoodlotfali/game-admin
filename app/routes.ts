import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

import { PAGE_URL } from "./constants/page-url";

export default [
  //   index("routes/home.tsx"),
  //   route("about", "routes/about.tsx"),
  layout("layouts/panel-layout.tsx", [
    index("routes/home.tsx"),
    route(PAGE_URL.publishers, "routes/publishers.tsx"),
  ]),
  layout("layouts/auth-layout.tsx", [
    route("about", "routes/about.tsx"),
    route("test", "routes/test.tsx"),
  ]),
] satisfies RouteConfig;
