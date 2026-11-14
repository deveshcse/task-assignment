import { TaskCards } from "@/components/tasks/TaskCards"
import { TaskTable } from "@/components/tasks/TaskTable"
import type { Task } from "@/types/task"

type TaskListProps = {
  tasks: Task[]
  onView: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete?: (task: Task) => void
}

export function TaskList({ tasks, onView, onEdit, onDelete }: TaskListProps) {
  return (
    <>
      <div className="md:hidden">
        <TaskCards
          tasks={tasks}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
      <div className="hidden md:block">
        <TaskTable
          tasks={tasks}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </>
  )
}
