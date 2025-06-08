import { Link } from "react-router";
import type { Route } from "./+types/home";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Welcome } from "../welcome/welcome";

/* eslint-disable no-empty-pattern  */
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button asChild>
        <Link to="/"> اجداد سگ</Link>
        {/* <User2Icon /> */}
      </Button>
      <ModeToggle />
    </div>
  );

  return <Welcome />;
}
