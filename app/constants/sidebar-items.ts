import { Component, Database, Home, Layers, Server } from "lucide-react";

import { PAGE_URL } from "./page-url";

export const SIDEBAR_ITEMS = [
  {
    title: "Games",
    url: "/",
    icon: Home,
  },
  {
    title: "Publishers",
    url: PAGE_URL.publishers,
    icon: Component,
  },
  {
    title: "Genres",
    url: "/genre",
    icon: Layers,
  },
  {
    title: "Platforms",
    url: "/platform",
    icon: Server,
  },
  {
    title: "Supabase",
    url: "/supabase",
    icon: Database,
  },
];
