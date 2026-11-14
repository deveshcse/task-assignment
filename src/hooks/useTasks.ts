import { useEffect, useMemo, useState } from "react"

import { createId, loadTasks, saveTasks } from "@/lib/storage"
import type {
  Task,
  TaskCounts,
  TaskFilters,
  TaskFormValues,
} from "@/types/task"

const defaultFilters: TaskFilters = {
  search: "",
  status: "all",
  priority: "all",
  sort: "earliest",
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks())
  const [filters, setFilters] = useState<TaskFilters>(defaultFilters)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const counts: TaskCounts = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter((task) => task.status === "Pending").length,
      inProgress: tasks.filter((task) => task.status === "In Progress").length,
      completed: tasks.filter((task) => task.status === "Completed").length,
    }),
    [tasks]
  )

  const filteredTasks = useMemo(() => {
    const search = filters.search.trim().toLowerCase()

    const next = tasks.filter((task) => {
      const matchesSearch =
        search === "" || task.title.toLowerCase().includes(search)
      const matchesStatus =
        filters.status === "all" || task.status === filters.status
      const matchesPriority =
        filters.priority === "all" || task.priority === filters.priority

      return matchesSearch && matchesStatus && matchesPriority
    })

    next.sort((a, b) => {
      const aTime = new Date(a.dueDate).getTime()
      const bTime = new Date(b.dueDate).getTime()
      return filters.sort === "earliest" ? aTime - bTime : bTime - aTime
    })

    return next
  }, [tasks, filters])

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all"

  function addTask(values: TaskFormValues) {
    const now = new Date().toISOString()
    const task: Task = {
      id: createId(),
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      dueDate: values.dueDate,
      status: values.status,
      createdAt: now,
      updatedAt: now,
    }

    setTasks((current) => [task, ...current])
  }

  function updateTask(id: string, values: TaskFormValues) {
    const now = new Date().toISOString()

    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              title: values.title.trim(),
              description: values.description.trim(),
              priority: values.priority,
              dueDate: values.dueDate,
              status: values.status,
              updatedAt: now,
            }
          : task
      )
    )
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  function updateFilters(partial: Partial<TaskFilters>) {
    setFilters((current) => ({ ...current, ...partial }))
  }

  function clearFilters() {
    setFilters(defaultFilters)
  }

  return {
    tasks,
    filteredTasks,
    filters,
    counts,
    hasActiveFilters,
    addTask,
    updateTask,
    deleteTask,
    updateFilters,
    clearFilters,
  }
}
