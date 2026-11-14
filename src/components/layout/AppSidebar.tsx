import {
  CheckSquareIcon,
  ClipboardListIcon,
  LayoutDashboardIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
import type { AppPage } from "@/types/navigation"

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

type AppSidebarProps = {
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

export function AppSidebar({ activePage, onNavigate }: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar()

  function handleNavigate(page: AppPage) {
    onNavigate(page)

    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 shrink-0 justify-center gap-0 border-b border-sidebar-border p-0 px-3">
        <div className="flex h-full min-w-0 items-center gap-2 px-1">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <CheckSquareIcon className="size-4" />
          </div>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold tracking-tight">
              task-assignment
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Task dashboard
            </p>
          </div>
          {isMobile ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              aria-label="Close sidebar"
              onClick={() => setOpenMobile(false)}
            >
              <XIcon />
            </Button>
          ) : null}
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
                    isActive={activePage === id}
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
