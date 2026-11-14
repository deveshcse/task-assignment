import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getTodayDateInputValue } from "@/lib/format"
import { validateTaskForm } from "@/lib/validation"
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskFormErrors,
  type TaskFormValues,
} from "@/types/task"

const emptyValues: TaskFormValues = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
  status: "Pending",
}

type TaskFormDialogProps = {
  open: boolean
  task: Task | null
  onOpenChange: (open: boolean) => void
  onSubmit: (values: TaskFormValues) => void
}

function toFormValues(task: Task | null): TaskFormValues {
  if (!task) {
    return emptyValues
  }

  return {
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate.slice(0, 10),
    status: task.status,
  }
}

type TaskFormFieldsProps = {
  initialValues: TaskFormValues
  isEditing: boolean
  onCancel: () => void
  onSubmit: (values: TaskFormValues) => void
}

function TaskFormFields({
  initialValues,
  isEditing,
  onCancel,
  onSubmit,
}: TaskFormFieldsProps) {
  const [values, setValues] = useState<TaskFormValues>(initialValues)
  const [errors, setErrors] = useState<TaskFormErrors>({})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validateTaskForm(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmit(values)
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-1.5">
        <Label htmlFor="task-title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="task-title"
          value={values.title}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              title: event.target.value,
            }))
          }
          aria-invalid={Boolean(errors.title)}
          placeholder="e.g. Prepare weekly report"
        />
        {errors.title ? (
          <p className="text-xs text-destructive">{errors.title}</p>
        ) : null}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="task-description">Description</Label>
        <Textarea
          id="task-description"
          value={values.description}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
          placeholder="Optional details"
          rows={3}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="task-priority">Priority</Label>
          <Select
            value={values.priority}
            onValueChange={(value) =>
              setValues((current) => ({
                ...current,
                priority: value as TaskFormValues["priority"],
              }))
            }
          >
            <SelectTrigger id="task-priority" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TASK_PRIORITIES.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="task-status">Status</Label>
          <Select
            value={values.status}
            onValueChange={(value) =>
              setValues((current) => ({
                ...current,
                status: value as TaskFormValues["status"],
              }))
            }
          >
            <SelectTrigger id="task-status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TASK_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="task-due-date">
          Due date <span className="text-destructive">*</span>
        </Label>
        <Input
          id="task-due-date"
          type="date"
          min={getTodayDateInputValue()}
          value={values.dueDate}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              dueDate: event.target.value,
            }))
          }
          aria-invalid={Boolean(errors.dueDate)}
        />
        {errors.dueDate ? (
          <p className="text-xs text-destructive">{errors.dueDate}</p>
        ) : null}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Save changes" : "Create task"}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function TaskFormDialog({
  open,
  task,
  onOpenChange,
  onSubmit,
}: TaskFormDialogProps) {
  const isEditing = Boolean(task)
  const formKey = `${task?.id ?? "new"}-${open ? "open" : "closed"}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit task" : "Create task"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the task details. Status can only be changed here."
              : "Add a new task. Title and due date are required."}
          </DialogDescription>
        </DialogHeader>

        {open ? (
          <TaskFormFields
            key={formKey}
            initialValues={toFormValues(task)}
            isEditing={isEditing}
            onCancel={() => onOpenChange(false)}
            onSubmit={(values) => {
              onSubmit(values)
              onOpenChange(false)
            }}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
