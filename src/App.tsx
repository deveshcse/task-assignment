import { useState } from "react"

import { SummaryCards } from "@/components/dashboard/SummaryCards"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppSidebar } from "@/components/layout/AppSidebar"
import { DeleteTaskDialog } from "@/components/tasks/DeleteTaskDialog"
import { EmptyState } from "@/components/tasks/EmptyState"
import { TaskFilters } from "@/components/tasks/TaskFilters"
import { TaskFormDialog } from "@/components/tasks/TaskFormDialog"
import { TaskTable } from "@/components/tasks/TaskTable"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useTasks } from "@/hooks/useTasks"
import type { Task, TaskFormValues } from "@/types/task"

export function App() {
  const {
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
  } = useTasks()

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
      return
    }

    addTask(values)
  }

  function handleConfirmDelete() {
    if (!deletingTask) {
      return
    }

    deleteTask(deletingTask.id)
    setDeletingTask(null)
  }

  const showNoTasks = tasks.length === 0
  const showNoResults = !showNoTasks && filteredTasks.length === 0

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <AppHeader onCreateTask={openCreateDialog} />

        <main className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-6">
          <SummaryCards counts={counts} />

          <TaskFilters
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            onChange={updateFilters}
            onClear={clearFilters}
          />

          <section className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold tracking-tight">Tasks</h2>
                <p className="text-xs text-muted-foreground">
                  Showing {filteredTasks.length} of {tasks.length} task
                  {tasks.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            {showNoTasks ? (
              <EmptyState variant="no-tasks" onCreateTask={openCreateDialog} />
            ) : null}

            {showNoResults ? (
              <EmptyState
                variant="no-results"
                onClearFilters={clearFilters}
              />
            ) : null}

            {!showNoTasks && !showNoResults ? (
              <TaskTable
                tasks={filteredTasks}
                onEdit={openEditDialog}
                onDelete={setDeletingTask}
              />
            ) : null}
          </section>
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
