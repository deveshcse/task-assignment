export const TASK_STATUSES = ["Pending", "In Progress", "Completed"] as const
export const TASK_PRIORITIES = ["Low", "Medium", "High"] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]
export type TaskPriority = (typeof TASK_PRIORITIES)[number]

export type Task = {
  id: string
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export type TaskFormValues = {
  title: string
  description: string
  priority: TaskPriority
  dueDate: string
  status: TaskStatus
}

export type TaskFormErrors = Partial<Record<"title" | "dueDate", string>>

export type StatusFilter = TaskStatus | "all"
export type PriorityFilter = TaskPriority | "all"
export type SortOrder = "earliest" | "latest"

export type TaskFilters = {
  search: string
  status: StatusFilter
  priority: PriorityFilter
  sort: SortOrder
}

export type TaskCounts = {
  total: number
  pending: number
  inProgress: number
  completed: number
}
