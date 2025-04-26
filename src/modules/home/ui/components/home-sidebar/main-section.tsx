"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useClerk, useAuth } from "@clerk/nextjs"
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react"
import Link from "next/link"

const items = [
  {
    title: "My Profile",
    icon: HomeIcon,
    href: "/profile",
  },
  {
    title: "Subscriptions",
    icon: PlaySquareIcon,
    href: "/feed/subscriptions",
    auth: true,
  },
  {
    title: "Trending",
    icon: FlameIcon,
    href: "/feed/trending",
  },
]

export const MainSection = () => {
  const clerk = useClerk()
  const { isSignedIn } = useAuth()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={false} // TODO: Change to look at current pathname
                onClick={(e) => {
                  if (!isSignedIn && item.auth) {
                    e.preventDefault()
                    clerk.openSignIn()
                  }
                }}
              >
                <Link href={item.href} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
