import { Component, Drama, Gamepad2, Server } from "lucide-react";

import { PAGE_URL } from "./page-url";

export const SIDEBAR_ITEMS = [
  {
    title: "Games",
    url: PAGE_URL.home,
    icon: Gamepad2,
  },
  {
    title: "Publishers",
    url: PAGE_URL.publishers,
    icon: Component,
  },
  {
    title: "Genres",
    url: PAGE_URL.genres,
    icon: Drama,
  },
  {
    title: "Platforms",
    url: PAGE_URL.platforms,
    icon: Server,
  },
];
