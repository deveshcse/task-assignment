import { TaskCards } from "@/components/tasks/TaskCards"
import { TaskTable } from "@/components/tasks/TaskTable"
import type { Task } from "@/types/task"

type TaskListProps = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  return (
    <>
      <div className="md:hidden">
        <TaskCards tasks={tasks} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className="hidden md:block">
        <TaskTable tasks={tasks} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </>
  )
}
