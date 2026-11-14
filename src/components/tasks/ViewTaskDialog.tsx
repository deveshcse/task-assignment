import { CalendarIcon } from "lucide-react"

import { PriorityBadge, StatusBadge } from "@/components/tasks/TaskBadges"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { formatDueDate, isOverdue } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Task } from "@/types/task"

type ViewTaskDialogProps = {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onEdit: (task: Task) => void
}

export function ViewTaskDialog({
  task,
  open,
  onOpenChange,
  onEdit,
}: ViewTaskDialogProps) {
  const overdue = task ? isOverdue(task.dueDate, task.status) : false

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader className="min-w-0 gap-3 pr-8 text-left">
          <div className="space-y-1">
            <p className="text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase">
              Task details
            </p>
            <DialogTitle className="min-w-0 text-xl font-semibold whitespace-normal break-words [overflow-wrap:anywhere] leading-snug">
              {task?.title ?? "Untitled task"}
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Read-only task details
          </DialogDescription>
          {task ? (
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
            </div>
          ) : null}
        </DialogHeader>

        {task ? (
          <div className="grid min-w-0 gap-5">
            <Separator />

            <section className="min-w-0 space-y-2">
              <h3 className="text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                Description
              </h3>
              <p
                className={cn(
                  "min-w-0 text-sm leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]",
                  task.description
                    ? "text-foreground"
                    : "text-muted-foreground italic"
                )}
              >
                {task.description || "No description provided."}
              </p>
            </section>

            <Separator />

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                  Due date
                </h3>
                <p
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium tabular-nums",
                    overdue ? "text-destructive" : "text-foreground"
                  )}
                >
                  <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
                  <span>
                    {formatDueDate(task.dueDate)}
                    {overdue ? " · Overdue" : ""}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                  Status
                </h3>
                <p className="text-sm font-medium text-foreground">
                  {task.status}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                  Priority
                </h3>
                <p className="text-sm font-medium text-foreground">
                  {task.priority}
                </p>
              </div>
            </section>
          </div>
        ) : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {task ? (
            <Button
              onClick={() => {
                onOpenChange(false)
                onEdit(task)
              }}
            >
              Edit task
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
