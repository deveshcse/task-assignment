import { isPastDate } from "@/lib/format"
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
  } else if (isPastDate(values.dueDate)) {
    errors.dueDate = "Due date cannot be in the past."
  }

  return errors
}
