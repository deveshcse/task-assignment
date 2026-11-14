import { SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type TaskFilters as TaskFiltersState,
} from "@/types/task"

type TaskFiltersProps = {
  filters: TaskFiltersState
  hasActiveFilters: boolean
  onChange: (partial: Partial<TaskFiltersState>) => void
  onClear: () => void
}

export function TaskFilters({
  filters,
  hasActiveFilters,
  onChange,
  onClear,
}: TaskFiltersProps) {
  return (
    <div className="flex min-w-0 flex-col gap-3 ">
      {hasActiveFilters ? (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={onClear}>
            <XIcon data-icon="inline-start" />
            Clear filters
          </Button>
        </div>
      ) : null}

      <div className="grid min-w-0 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="min-w-0 space-y-1.5 md:col-span-2 xl:col-span-1">
          <Label htmlFor="task-search">Search by title</Label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="task-search"
              value={filters.search}
              onChange={(event) => onChange({ search: event.target.value })}
              placeholder="Search tasks..."
              className="w-full pl-7"
            />
          </div>
        </div>

        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="status-filter">Status</Label>
          <Select
            value={filters.status}
            onValueChange={(value) =>
              onChange({
                status: value as TaskFiltersState["status"],
              })
            }
          >
            <SelectTrigger id="status-filter" className="w-full">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {TASK_STATUSES.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="priority-filter">Priority</Label>
          <Select
            value={filters.priority}
            onValueChange={(value) =>
              onChange({
                priority: value as TaskFiltersState["priority"],
              })
            }
          >
            <SelectTrigger id="priority-filter" className="w-full">
              <SelectValue placeholder="All priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              {TASK_PRIORITIES.map((priority) => (
                <SelectItem key={priority} value={priority}>
                  {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-0 space-y-1.5">
          <Label htmlFor="sort-filter">Sort by due date</Label>
          <Select
            value={filters.sort}
            onValueChange={(value) =>
              onChange({
                sort: value as TaskFiltersState["sort"],
              })
            }
          >
            <SelectTrigger id="sort-filter" className="w-full">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="earliest">Earliest first</SelectItem>
              <SelectItem value="latest">Latest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
