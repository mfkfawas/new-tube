import { PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavBar } from "@/modules/home/ui/components/home-navbar";

export function HomeLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavBar />
        <div>
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}
