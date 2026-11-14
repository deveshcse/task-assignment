import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from "@/types/task"

export const TASKS_STORAGE_KEY = "task-assignment-tasks"

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isValidStatus(value: unknown): value is TaskStatus {
  return typeof value === "string" && TASK_STATUSES.includes(value as TaskStatus)
}

function isValidPriority(value: unknown): value is TaskPriority {
  return (
    typeof value === "string" &&
    TASK_PRIORITIES.includes(value as TaskPriority)
  )
}

function isValidDateString(value: unknown): value is string {
  if (typeof value !== "string" || value.trim() === "") {
    return false
  }

  const date = new Date(value)
  return !Number.isNaN(date.getTime())
}

function isValidTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") {
    return false
  }

  const task = value as Record<string, unknown>

  return (
    isNonEmptyString(task.id) &&
    isNonEmptyString(task.title) &&
    typeof task.description === "string" &&
    isValidPriority(task.priority) &&
    isValidDateString(task.dueDate) &&
    isValidStatus(task.status) &&
    isValidDateString(task.createdAt) &&
    isValidDateString(task.updatedAt)
  )
}

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY)

    if (raw === null || raw.trim() === "") {
      return []
    }

    const parsed: unknown = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.filter(isValidTask)
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Ignore quota / private-mode write failures so the UI keeps working.
  }
}

export function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }

  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
