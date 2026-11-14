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

export function getTodayDateInputValue(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function startOfLocalDay(value: string | Date): Date | null {
  const date = value instanceof Date ? new Date(value) : new Date(value)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  date.setHours(0, 0, 0, 0)
  return date
}

export function isPastDate(dueDate: string): boolean {
  const due = startOfLocalDay(dueDate)
  const today = startOfLocalDay(new Date())

  if (!due || !today) {
    return false
  }

  return due.getTime() < today.getTime()
}

export function isOverdue(dueDate: string, status: string): boolean {
  if (status === "Completed") {
    return false
  }

  return isPastDate(dueDate)
}
