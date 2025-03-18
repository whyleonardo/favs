"use client"

import { Icons } from "@/components/icons"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebarNav } from "@/constants/sidebar-nav"

import { MenuButton } from "./menu-button"

export const AppSidebar = () => {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem className="list-none">
          <div className="h-8 p-2">
            <Icons.shadcn />
          </div>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="h-[calc(100svh-5.625rem)]">
              {sidebarNav.map((item) => (
                <MenuButton key={`${item.title}-${item.type}`} navItem={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
