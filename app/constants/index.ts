import { Home, Component, Server, Layers, Database } from "lucide-react";

export const SIDEBAR_ITEMS = [
  {
    title: "Games",
    url: "/",
    icon: Home,
  },
  {
    title: "Publishers",
    url: "/publisher",
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
