import type { TaskFormErrors, TaskFormValues } from "@/types/task"

export function validateTaskForm(values: TaskFormValues): TaskFormErrors {
  const errors: TaskFormErrors = {}

  if (!values.title.trim()) {
    errors.title = "Title is required."
  }

  if (!values.dueDate.trim()) {
    errors.dueDate = "Due date is required."
  } else if (Number.isNaN(new Date(values.dueDate).getTime())) {
    errors.dueDate = "Enter a valid due date."
  }

  return errors
}
