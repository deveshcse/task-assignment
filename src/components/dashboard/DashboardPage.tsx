import { SummaryCards } from "@/components/dashboard/SummaryCards"
import { RecentTasks } from "@/components/dashboard/RecentTasks"
import { EmptyState } from "@/components/tasks/EmptyState"
import type { Task, TaskCounts } from "@/types/task"

type DashboardPageProps = {
  counts: TaskCounts
  recentTasks: Task[]
  onCreateTask: () => void
  onViewAllTasks: () => void
  onEditTask: (task: Task) => void
}

export function DashboardPage({
  counts,
  recentTasks,
  onCreateTask,
  onViewAllTasks,
  onEditTask,
}: DashboardPageProps) {
  if (counts.total === 0) {
    return (
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <SummaryCards counts={counts} />
        <EmptyState variant="no-tasks" onCreateTask={onCreateTask} />
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      <SummaryCards counts={counts} />
      <RecentTasks
        tasks={recentTasks}
        onViewAll={onViewAllTasks}
        onEdit={onEditTask}
      />
    </div>
  )
}
