import {
  CheckCircle2Icon,
  CircleDashedIcon,
  ListTodoIcon,
  LoaderCircleIcon,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TaskCounts } from "@/types/task"

type SummaryCardsProps = {
  counts: TaskCounts
}

const cards = [
  {
    key: "total" as const,
    label: "Total",
    icon: ListTodoIcon,
  },
  {
    key: "pending" as const,
    label: "Pending",
    icon: CircleDashedIcon,
  },
  {
    key: "inProgress" as const,
    label: "In Progress",
    icon: LoaderCircleIcon,
  },
  {
    key: "completed" as const,
    label: "Completed",
    icon: CheckCircle2Icon,
  },
]

export function SummaryCards({ counts }: SummaryCardsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon }) => (
        <Card key={key} size="sm">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <Icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tracking-tight tabular-nums">
              {counts[key]}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
