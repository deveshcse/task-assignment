import { ClipboardListIcon, FilterXIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type EmptyStateProps = {
  variant: "no-tasks" | "no-results"
  onCreateTask?: () => void
  onClearFilters?: () => void
}

export function EmptyState({
  variant,
  onCreateTask,
  onClearFilters,
}: EmptyStateProps) {
  if (variant === "no-results") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-4 py-12 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
          <FilterXIcon className="size-5 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">No tasks match your filters</p>
          <p className="max-w-sm text-xs text-muted-foreground">
            Try adjusting search, status, or priority to see more tasks.
          </p>
        </div>
        {onClearFilters ? (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            Clear filters
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-4 py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        <ClipboardListIcon className="size-5 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">No tasks yet</p>
        <p className="max-w-sm text-xs text-muted-foreground">
          Create your first task to start tracking work on this dashboard.
        </p>
      </div>
      {onCreateTask ? (
        <Button size="sm" onClick={onCreateTask}>
          <PlusIcon data-icon="inline-start" />
          Create task
        </Button>
      ) : null}
    </div>
  )
}
