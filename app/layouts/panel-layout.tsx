import { Outlet, useLocation } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SIDEBAR_COOKIE_NAME, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PAGE_TITLE_URL } from "@/constants/page-url-title";
import type { Route } from "../+types/root";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = Object.fromEntries(cookieHeader?.split(";").map((c) => c.trim().split("=")) || []);

  return {
    sidebar_state: cookie?.[SIDEBAR_COOKIE_NAME] === "true",
  };
};

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 h-14 space-x-2 bg-sidebar border-b flex items-center px-3 md:px-6">
      <SidebarTrigger className="size-9" />
      <ModeToggle />

      <h5 className="ml-5">{PAGE_TITLE_URL[pathname]}</h5>

      <Avatar className="ml-auto" >
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>FL</AvatarFallback>
      </Avatar>
    </header>
  );
};

export default function PanelLayout({ loaderData }: any) {
  return (
    <SidebarProvider defaultOpen={loaderData?.sidebar_state}>
      <AppSidebar />
      <div className=" w-full">
        <Header />
        <main className="flex-1 overflow-auto p-3 ">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
