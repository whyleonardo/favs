"use client"

import { usePathname, useRouter } from "next/navigation"

import { useTheme } from "next-themes"

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { SidebarItem } from "@/constants/sidebar-nav"
import { useSignOut } from "@/features/auth/api/use-sign-out"
import { cn } from "@/lib/utils"

import { MoonIcon, SunIcon } from "lucide-react"

interface NavItem {
  navItem: SidebarItem
}

export const MenuButton = ({ navItem }: NavItem) => {
  const pathname = usePathname()

  const router = useRouter()

  const { mutate: handleSignOut } = useSignOut()

  const { theme, setTheme } = useTheme()

  const { toggleSidebar } = useSidebar()

  const isActiveHomePage = navItem.href === "/" && pathname === "/"
  const isActivePathname = !isActiveHomePage && pathname === navItem.href
  const isActive = isActiveHomePage || isActivePathname

  const isActionItem = navItem.type === "action"

  const isActionSignOut = navItem.actionType === "sign-out"
  const isActionThemeToggle = navItem.actionType === "theme-toggle"

  const isDark = theme === "dark"

  const Icon = navItem.icon
  const ThemeIcon = isDark ? MoonIcon : SunIcon

  const onClick = () => {
    if (navItem.href && navItem.type === "nav-link") {
      router.push(navItem.href)
      toggleSidebar()
    }

    switch (navItem.actionType) {
      case "sign-out": {
        return handleSignOut()
      }
      case "theme-toggle": {
        return setTheme((theme) => (theme === "dark" ? "light" : "dark"))
      }

      default: {
        return
      }
    }
  }

  return (
    <SidebarMenuItem
      data-menu-type={navItem.type}
      className={cn(
        isActionItem && "[&:has(+[data-menu-type=action])]:mt-auto"
      )}
    >
      <SidebarMenuButton
        className={cn(
          "cursor-pointer",
          isActive && "!bg-secondary hover:!bg-secondary/80 transition-colors"
        )}
        tooltip={navItem.title}
        isActive={isActive}
        onClick={onClick}
      >
        {isActionThemeToggle ? (
          <ThemeIcon className={cn("text-muted-foreground")} />
        ) : (
          <Icon
            className={cn(
              "text-muted-foreground transition-colors",
              isActive && "text-secondary-foreground",
              isActionSignOut && "text-destructive"
            )}
          />
        )}

        {navItem.title}
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
