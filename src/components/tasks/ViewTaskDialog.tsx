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
        <DialogHeader className="min-w-0 gap-2 pr-8 text-left">
          <DialogTitle className="min-w-0 whitespace-normal break-words [overflow-wrap:anywhere] leading-snug">
            {task?.title ?? "Task details"}
          </DialogTitle>
          <DialogDescription>Read-only task details</DialogDescription>
        </DialogHeader>

        {task ? (
          <div className="grid min-w-0 gap-4 text-sm">
            <div className="min-w-0 space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Description
              </p>
              <p className="min-w-0 whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-relaxed text-foreground">
                {task.description || "No description"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>

            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Due date
              </p>
              <p
                className={cn(
                  "tabular-nums",
                  overdue && "font-medium text-destructive"
                )}
              >
                {formatDueDate(task.dueDate)}
                {overdue ? " · Overdue" : ""}
              </p>
            </div>
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
