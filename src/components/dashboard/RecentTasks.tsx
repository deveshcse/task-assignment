import { EyeIcon, PencilIcon } from "lucide-react"

import { PriorityBadge, StatusBadge } from "@/components/tasks/TaskBadges"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDueDate, isOverdue } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Task } from "@/types/task"

type RecentTasksProps = {
  tasks: Task[]
  onViewAll: () => void
  onView: (task: Task) => void
  onEdit: (task: Task) => void
}

export function RecentTasks({
  tasks,
  onViewAll,
  onView,
  onEdit,
}: RecentTasksProps) {
  return (
    <section className="min-w-0 space-y-3">
      <div className="flex min-w-0 flex-wrap items-end justify-between gap-2">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold tracking-tight sm:text-base">
            Recent tasks
          </h2>
          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            Latest updates across your work
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onViewAll}>
          View all
        </Button>
      </div>

      <ul className="min-w-0 divide-y overflow-hidden rounded-lg border">
        {tasks.map((task) => {
          const overdue = isOverdue(task.dueDate, task.status)

          return (
            <li key={task.id} className="min-w-0">
              <div className="flex min-w-0 items-start gap-3 px-4 py-3 sm:items-center">
                <div className="min-w-0 flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">{task.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {task.description || "No description"}
                  </p>
                  <div className="mt-2 flex min-w-0 flex-wrap items-center gap-2">
                    <PriorityBadge priority={task.priority} />
                    <StatusBadge status={task.status} />
                    <span
                      className={cn(
                        "truncate text-xs tabular-nums text-muted-foreground",
                        overdue && "font-medium text-destructive"
                      )}
                    >
                      {formatDueDate(task.dueDate)}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`View ${task.title}`}
                        onClick={() => onView(task)}
                      >
                        <EyeIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View task</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${task.title}`}
                        onClick={() => onEdit(task)}
                      >
                        <PencilIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit task</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
