import { Outlet, useLocation } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SIDEBAR_COOKIE_NAME, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PAGE_NAME } from "@/constants/page-name";
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
    <header className="bg-sidebar sticky top-0 flex h-14 items-center border-b px-3 py-2 md:px-6">
      <SidebarTrigger className="mr-2 size-9" />
      <ModeToggle />
      <Separator orientation="vertical" className="mx-3" />

      <h5>{PAGE_NAME[pathname]}</h5>

      <Avatar className="ml-auto">
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
      <div className="w-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-3">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
