export function formatDueDate(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "Invalid date"
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export function isOverdue(dueDate: string, status: string): boolean {
  if (status === "Completed") {
    return false
  }

  const due = new Date(dueDate)
  if (Number.isNaN(due.getTime())) {
    return false
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)

  return due.getTime() < today.getTime()
}
