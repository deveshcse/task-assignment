import {
  CalendarIcon,
  EyeIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"

import { PriorityBadge, StatusBadge } from "@/components/tasks/TaskBadges"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatDueDate, isOverdue } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Task } from "@/types/task"

type TaskCardsProps = {
  tasks: Task[]
  onView: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCards({ tasks, onView, onEdit, onDelete }: TaskCardsProps) {
  return (
    <div className="grid gap-3">
      {tasks.map((task) => {
        const overdue = isOverdue(task.dueDate, task.status)

        return (
          <Card key={task.id} size="sm" className="min-w-0">
            <CardHeader className="gap-2">
              <div className="flex min-w-0 items-start justify-between gap-2">
                <CardTitle className="min-w-0 flex-1 truncate text-base leading-snug">
                  {task.title}
                </CardTitle>
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

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${task.title}`}
                        onClick={() => onDelete(task)}
                      >
                        <Trash2Icon className="text-destructive" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete task</TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {task.description || "No description"}
              </p>
            </CardHeader>

            <CardContent className="flex flex-wrap items-center gap-2">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </CardContent>

            <CardFooter className="border-t">
              <p
                className={cn(
                  "flex items-center gap-1.5 text-sm tabular-nums text-muted-foreground",
                  overdue && "font-medium text-destructive"
                )}
              >
                <CalendarIcon className="size-3.5" />
                {formatDueDate(task.dueDate)}
                {overdue ? " · Overdue" : ""}
              </p>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
