import { useState } from "react"
import { toast } from "sonner"

import { DashboardPage } from "@/components/dashboard/DashboardPage"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog"
import { TaskFormDialog } from "@/components/tasks/TaskFormDialog"
import { TasksPage } from "@/components/tasks/TasksPage"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useTasks } from "@/hooks/useTasks"
import type { AppPage } from "@/types/navigation"
import type { Task, TaskFormValues } from "@/types/task"

export function App() {
  const {
    tasks,
    filteredTasks,
    recentTasks,
    filters,
    counts,
    hasActiveFilters,
    addTask,
    updateTask,
    deleteTask,
    updateFilters,
    clearFilters,
  } = useTasks()

  const [page, setPage] = useState<AppPage>("dashboard")
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  function openCreateDialog() {
    setEditingTask(null)
    setFormOpen(true)
  }

  function openEditDialog(task: Task) {
    setEditingTask(task)
    setFormOpen(true)
  }

  function handleFormSubmit(values: TaskFormValues) {
    if (editingTask) {
      updateTask(editingTask.id, values)
      toast.success("Task updated", {
        description: `"${values.title.trim()}" was saved successfully.`,
      })
      return
    }

    addTask(values)
    toast.success("Task created", {
      description: `"${values.title.trim()}" was added to your list.`,
    })
  }

  function handleConfirmDelete() {
    if (!deletingTask) {
      return
    }

    const title = deletingTask.title
    deleteTask(deletingTask.id)
    setDeletingTask(null)
    toast.success("Task deleted", {
      description: `"${title}" was removed.`,
    })
  }

  return (
    <SidebarProvider>
      <AppSidebar activePage={page} onNavigate={setPage} />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <AppHeader
          page={page}
          onCreateTask={page === "tasks" ? openCreateDialog : undefined}
        />

        <main className="flex min-w-0 flex-1 flex-col p-4 sm:p-6">
          {page === "dashboard" ? (
            <DashboardPage
              counts={counts}
              recentTasks={recentTasks}
              onCreateTask={openCreateDialog}
              onViewAllTasks={() => setPage("tasks")}
              onEditTask={openEditDialog}
            />
          ) : (
            <TasksPage
              tasks={tasks}
              filteredTasks={filteredTasks}
              filters={filters}
              hasActiveFilters={hasActiveFilters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
              onCreateTask={openCreateDialog}
              onEditTask={openEditDialog}
              onDeleteTask={setDeletingTask}
            />
          )}
        </main>
      </SidebarInset>

      <TaskFormDialog
        open={formOpen}
        task={editingTask}
        onOpenChange={(open) => {
          setFormOpen(open)
          if (!open) {
            setEditingTask(null)
          }
        }}
        onSubmit={handleFormSubmit}
      />

      <DeleteTaskDialog
        task={deletingTask}
        open={Boolean(deletingTask)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingTask(null)
          }
        }}
        onConfirm={handleConfirmDelete}
      />
    </SidebarProvider>
  )
}

export default App
