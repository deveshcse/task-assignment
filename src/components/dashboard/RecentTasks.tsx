import { TaskList } from "@/components/tasks/TaskList"
import { Button } from "@/components/ui/button"
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

      <TaskList tasks={tasks} onView={onView} onEdit={onEdit} />
    </section>
  )
}
