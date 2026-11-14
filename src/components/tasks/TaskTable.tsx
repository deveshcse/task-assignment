import { PencilIcon, Trash2Icon } from "lucide-react"

import { PriorityBadge, StatusBadge } from "@/components/tasks/TaskBadges"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDueDate, isOverdue } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Task } from "@/types/task"

type TaskTableProps = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskTable({ tasks, onEdit, onDelete }: TaskTableProps) {
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border">
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[28%]">Title</TableHead>
              <TableHead className="w-[22%]">Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => {
              const overdue = isOverdue(task.dueDate, task.status)

              return (
                <TableRow key={task.id}>
                  <TableCell className="max-w-0 font-medium">
                    <p className="truncate">{task.title}</p>
                  </TableCell>
                  <TableCell className="max-w-0 text-muted-foreground">
                    <p className="truncate">
                      {task.description || "—"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={task.priority} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={task.status} />
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "tabular-nums",
                        overdue && "font-medium text-destructive"
                      )}
                    >
                      {formatDueDate(task.dueDate)}
                      {overdue ? " · Overdue" : ""}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${task.title}`}
                        onClick={() => onEdit(task)}
                      >
                        <PencilIcon />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${task.title}`}
                        onClick={() => onDelete(task)}
                      >
                        <Trash2Icon className="text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
