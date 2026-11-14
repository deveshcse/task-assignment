import { useState } from "react"
import {
  CheckSquareIcon,
  ClipboardListIcon,
  LayoutDashboardIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

type NavId = "dashboard" | "tasks"

const navItems = [
  {
    id: "dashboard" as const,
    label: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    id: "tasks" as const,
    label: "Tasks",
    icon: ClipboardListIcon,
  },
]

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar()
  const [activeNav, setActiveNav] = useState<NavId>("dashboard")

  function handleNavigate(id: NavId) {
    setActiveNav(id)

    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: "smooth", block: "start" })

    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4">
        <div className="flex items-center gap-2 px-1">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CheckSquareIcon className="size-4" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold tracking-tight">
              task-assignment
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Task dashboard
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ id, label, icon: Icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    type="button"
                    isActive={activeNav === id}
                    tooltip={label}
                    onClick={() => handleNavigate(id)}
                  >
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
