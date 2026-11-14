import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { AppPage } from "@/types/navigation"

const pageCopy: Record<
  AppPage,
  {
    title: string
    description: string
  }
> = {
  dashboard: {
    title: "Dashboard",
    description: "Overview of your task metrics and recent work",
  },
  tasks: {
    title: "Tasks",
    description: "Search, filter, and manage all tasks",
  },
}

type AppHeaderProps = {
  page: AppPage
  onCreateTask?: () => void
}

export function AppHeader({ page, onCreateTask }: AppHeaderProps) {
  const copy = pageCopy[page]

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-4" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold tracking-tight sm:text-base">
          {copy.title}
        </h1>
        <p className="hidden truncate text-xs text-muted-foreground sm:block">
          {copy.description}
        </p>
      </div>
      {page === "tasks" && onCreateTask ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" onClick={onCreateTask}>
              <PlusIcon data-icon="inline-start" />
              New Task
            </Button>
          </TooltipTrigger>
          <TooltipContent>Create a new task</TooltipContent>
        </Tooltip>
      ) : null}
    </header>
  )
}
