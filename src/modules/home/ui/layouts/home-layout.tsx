import { PropsWithChildren } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { HomeNavBar } from "@/modules/home/ui/components/home-navbar"
import { HomeSidebar } from "@/modules/home/ui/components/home-sidebar"

export function HomeLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavBar />
        <div className="flex min-h-screen pt-16">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
