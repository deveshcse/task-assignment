import { PriorityBadge, StatusBadge } from "@/components/tasks/TaskBadges"
import { Button } from "@/components/ui/button"
import { formatDueDate, isOverdue } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Task } from "@/types/task"

type RecentTasksProps = {
  tasks: Task[]
  onViewAll: () => void
  onEdit: (task: Task) => void
}

export function RecentTasks({ tasks, onViewAll, onEdit }: RecentTasksProps) {
  return (
    <section className="min-w-0 space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold tracking-tight sm:text-base">
            Recent tasks
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Latest updates across your work
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View all
        </Button>
      </div>

      <ul className="divide-y rounded-lg border">
        {tasks.map((task) => {
          const overdue = isOverdue(task.dueDate, task.status)

          return (
            <li key={task.id}>
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="flex w-full min-w-0 flex-col gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-sm font-medium">{task.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {task.description || "No description"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <PriorityBadge priority={task.priority} />
                  <StatusBadge status={task.status} />
                  <span
                    className={cn(
                      "text-xs tabular-nums text-muted-foreground",
                      overdue && "font-medium text-destructive"
                    )}
                  >
                    {formatDueDate(task.dueDate)}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
