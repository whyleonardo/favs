import {
  HomeIcon,
  LinkIcon,
  LogOutIcon,
  type LucideIcon,
  TagIcon,
} from "lucide-react"

type ActionType = "sign-out" | "theme-toggle"

type SidebarNav = {
  title: string
  href: string
  icon: LucideIcon
  type: "nav-link"
  actionType?: never
}

type SidebarAction = {
  title: string
  href?: never
  icon: LucideIcon
  theme?: never
  type: "action"
  actionType: ActionType
}

export type SidebarItem = SidebarNav | SidebarAction

export const sidebarNav: SidebarItem[] = [
  {
    title: "Home",
    href: "/",
    icon: HomeIcon,
    type: "nav-link",
  },
  {
    title: "Links",
    href: "/links",
    icon: LinkIcon,
    type: "nav-link",
  },
  {
    title: "Tags",
    href: "/tags",
    icon: TagIcon,
    type: "nav-link",
  },
  {
    title: "Theme",
    icon: LogOutIcon,
    type: "action",
    actionType: "theme-toggle",
  },
  {
    title: "Sign Out",
    icon: LogOutIcon,
    type: "action",
    actionType: "sign-out",
  },
]
