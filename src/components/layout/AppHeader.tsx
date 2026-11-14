import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

type AppHeaderProps = {
  onCreateTask: () => void
}

export function AppHeader({ onCreateTask }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-4" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold tracking-tight sm:text-base">
          Task Management Dashboard
        </h1>
        <p className="hidden truncate text-xs text-muted-foreground sm:block">
          Create, track, and organize your work
        </p>
      </div>
      <Button size="sm" onClick={onCreateTask}>
        <PlusIcon data-icon="inline-start" />
        New Task
      </Button>
    </header>
  )
}
