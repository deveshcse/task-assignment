import { EmptyState } from "@/components/tasks/EmptyState"
import { TaskFilters } from "@/components/tasks/TaskFilters"
import { TaskList } from "@/components/tasks/TaskList"
import type { Task, TaskFilters as TaskFiltersState } from "@/types/task"

type TasksPageProps = {
  tasks: Task[]
  filteredTasks: Task[]
  filters: TaskFiltersState
  hasActiveFilters: boolean
  onFiltersChange: (partial: Partial<TaskFiltersState>) => void
  onClearFilters: () => void
  onCreateTask: () => void
  onEditTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
}

export function TasksPage({
  tasks,
  filteredTasks,
  filters,
  hasActiveFilters,
  onFiltersChange,
  onClearFilters,
  onCreateTask,
  onEditTask,
  onDeleteTask,
}: TasksPageProps) {
  const showNoTasks = tasks.length === 0
  const showNoResults = !showNoTasks && filteredTasks.length === 0

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <TaskFilters
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onChange={onFiltersChange}
        onClear={onClearFilters}
      />

      <section className="min-w-0 space-y-3">
        <div>
          <h2 className="text-sm font-semibold tracking-tight sm:text-base">
            All tasks
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Showing {filteredTasks.length} of {tasks.length} task
            {tasks.length === 1 ? "" : "s"}
          </p>
        </div>

        {showNoTasks ? (
          <EmptyState variant="no-tasks" onCreateTask={onCreateTask} />
        ) : null}

        {showNoResults ? (
          <EmptyState variant="no-results" onClearFilters={onClearFilters} />
        ) : null}

        {!showNoTasks && !showNoResults ? (
          <TaskList
            tasks={filteredTasks}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ) : null}
      </section>
    </div>
  )
}
