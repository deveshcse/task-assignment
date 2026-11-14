import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { TaskPriority, TaskStatus } from "@/types/task"

const statusClassName: Record<TaskStatus, string> = {
  Pending: "bg-amber-100 text-amber-900 hover:bg-amber-100",
  "In Progress": "bg-sky-100 text-sky-900 hover:bg-sky-100",
  Completed: "bg-emerald-100 text-emerald-900 hover:bg-emerald-100",
}

const priorityClassName: Record<TaskPriority, string> = {
  Low: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  Medium: "bg-orange-100 text-orange-900 hover:bg-orange-100",
  High: "bg-rose-100 text-rose-900 hover:bg-rose-100",
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge variant="secondary" className={cn(statusClassName[status])}>
      {status}
    </Badge>
  )
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <Badge variant="secondary" className={cn(priorityClassName[priority])}>
      {priority}
    </Badge>
  )
}
