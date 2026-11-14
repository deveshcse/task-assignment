# task-assignment

A responsive **Task Management Dashboard** built for a frontend developer assessment. Users can create, view, edit, and delete tasks entirely in the browser, with data persisted in LocalStorage.

No backend is required.

---

## Live links

| Item | Link |
| --- | --- |
| GitHub repository | [deveshcse/task-assignment](https://github.com/deveshcse/task-assignment) |
| Live deployment | [task-assignment-psi-six.vercel.app](http://task-assignment-psi-six.vercel.app/) |
| Screen recording | [Loom walkthrough](https://www.loom.com/share/45b1359ed3f14ebc92540e25055c5fb9) |

---

## Overview

`task-assignment` is a single-page React application with two main views:

1. **Dashboard** — summary metrics and recent tasks
2. **Tasks** — full task list with search, filters, sorting, and CRUD actions

The UI is built with reusable React components, TypeScript, Tailwind CSS, and shadcn/ui.

---

## Features

### Task management

- Create, view, edit, and delete tasks
- Modal dialogs for create / edit and read-only view
- Confirmation dialog before delete
- Status can be changed only through the edit dialog

### Task fields

| Field | Required | Notes |
| --- | --- | --- |
| Title | Yes | Validated on submit |
| Description | No | Optional free text |
| Priority | Yes | Low / Medium / High |
| Due date | Yes | Past dates are disabled |
| Status | Yes | Pending / In Progress / Completed |

### Dashboard

- Summary cards for **Total**, **Pending**, **In Progress**, and **Completed**
- Counts update immediately when tasks are created, updated, or deleted
- Recent tasks list (latest 5 by `updatedAt`)
- Same table/card presentation as the Tasks page
- View and Edit actions only on recent tasks
- Empty state with Create button when there are no tasks

### Tasks page

- Search by title
- Filter by status
- Filter by priority
- Sort by due date (earliest first / latest first)
- Search and filters work together
- Create button in the page header
- View / Edit / Delete actions
- Distinct empty states:
  - No tasks at all
  - No results for the current filters

### UX and responsiveness

- Sidebar + header layout
- Desktop: table layout
- Mobile: card layout
- Tooltips on action icons
- Long titles/descriptions truncate in lists and wrap in the view dialog
- No horizontal page overflow
- Light theme only

### Data persistence

- Tasks are saved in browser LocalStorage
- Data survives page refresh
- Missing, empty, or invalid LocalStorage data is handled safely and will not crash the app

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 |
| UI components | shadcn/ui (Radix Nova preset) |
| Icons | Lucide React |
| Font | Inter Variable |

---

## Getting started

### Prerequisites

- Node.js **20+** (recommended)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/deveshcse/task-assignment.git
cd task-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### 4. Production build

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

---

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Typecheck and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run TypeScript checks without emitting files |
| `npm run lint` | Run ESLint |
| `npm run format` | Format TypeScript/TSX files with Prettier |

---

## Project structure

```text
src/
├── App.tsx                      # App shell, page routing state, dialogs
├── main.tsx                     # React entry point
├── index.css                    # Global styles / design tokens
│
├── components/
│   ├── dashboard/
│   │   ├── DashboardPage.tsx    # Metrics + recent tasks / empty state
│   │   ├── RecentTasks.tsx      # Recent tasks section
│   │   └── SummaryCards.tsx     # Total / Pending / In Progress / Completed
│   │
│   ├── layout/
│   │   ├── AppHeader.tsx        # Page header (Create only on Tasks)
│   │   └── AppSidebar.tsx       # Sidebar navigation
│   │
│   ├── tasks/
│   │   ├── TasksPage.tsx        # Filters + task list
│   │   ├── TaskFilters.tsx      # Search / status / priority / sort
│   │   ├── TaskList.tsx         # Responsive switch: cards ↔ table
│   │   ├── TaskTable.tsx        # Desktop table view
│   │   ├── TaskCards.tsx        # Mobile card view
│   │   ├── TaskBadges.tsx       # Status / priority badges
│   │   ├── TaskFormDialog.tsx   # Create / edit modal + validation
│   │   ├── ViewTaskDialog.tsx   # Read-only task details
│   │   ├── DeleteTaskDialog.tsx # Delete confirmation
│   │   └── EmptyState.tsx       # No tasks / no filter results
│   │
│   └── ui/                      # shadcn/ui primitives
│
├── hooks/
│   ├── useTasks.ts              # CRUD, filters, counts, recent tasks
│   └── use-mobile.ts            # Breakpoint helper used by sidebar
│
├── lib/
│   ├── storage.ts               # LocalStorage load/save + validation
│   ├── validation.ts            # Form validation rules
│   ├── format.ts                # Date helpers / overdue checks
│   └── utils.ts                 # className helper
│
└── types/
    ├── task.ts                  # Task model and filter types
    └── navigation.ts            # Dashboard / Tasks page union
```

---

## Architecture notes

### State management

- Task data lives in the `useTasks` hook
- The hook owns:
  - CRUD operations
  - LocalStorage sync
  - Summary counts
  - Filtered/sorted task list
  - Recent tasks list
- Page navigation (`dashboard` | `tasks`) is controlled in `App.tsx`

### Persistence

- Storage key: `task-assignment-tasks`
- On load, stored JSON is parsed and validated
- Invalid entries are ignored
- Corrupt or missing storage falls back to an empty task list

### Validation

Required rules:

- Title cannot be empty
- Due date is required
- Due date must be a valid date
- Due date cannot be in the past

Past dates are also disabled in the date picker via `min={today}`.

### Responsive task list

`TaskList` renders:

- **Mobile (`< md`)**: `TaskCards`
- **Desktop (`md+`)**: `TaskTable`

Delete is optional, so Dashboard recent tasks can reuse the same list UI with only View and Edit.

---

## Edge cases handled

- Cannot submit a task without title and due date
- Search + status + priority filters combine correctly
- Dashboard counts update immediately after create / update / delete
- Invalid LocalStorage data does not crash the app
- Empty message differs for:
  - zero tasks in storage
  - filters returning no matches
- Long titles/descriptions truncate in lists and wrap in the view dialog

---

## Key product decisions

- **Create / Edit** uses modal dialogs
- **Status changes** only through the edit form
- **Create button** appears on the Tasks page header (and Dashboard empty state)
- **Theme** is light-only
- **UI system** uses shadcn/ui Nova preset rather than a ready-made dashboard template




## License

This project was created as a frontend assessment submission.
