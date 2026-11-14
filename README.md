# task-assignment

A responsive Task Management Dashboard built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. Tasks are stored in the browser with LocalStorage—no backend required.

## Features

- Create, view, edit, and delete tasks
- Fields: title (required), description (optional), priority, due date (required), status
- Statuses: Pending, In Progress, Completed
- Summary cards for Total / Pending / In Progress / Completed
- Search by title, filter by status and priority, sort by due date
- Combined search + filters
- LocalStorage persistence with safe handling of missing/invalid data
- Form validation with clear error messages
- Delete confirmation dialog
- Distinct empty states for “no tasks” vs “no filter results”
- Responsive layout with sidebar, header, and task table (no horizontal page overflow)

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- shadcn/ui (Radix)

## Getting started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Other scripts

```bash
npm run lint
npm run typecheck
npm run format
```

## Project structure

```text
src/
  components/
    dashboard/     # Summary cards
    layout/        # Sidebar + header
    tasks/         # Filters, table, dialogs, empty state
    ui/            # shadcn primitives
  hooks/           # useTasks (CRUD + filter/sort)
  lib/             # LocalStorage, validation, formatting
  types/           # Shared TypeScript types
  App.tsx          # Dashboard composition
```

## Key decisions

- **LocalStorage key:** `task-assignment-tasks`
- **Status changes** happen only in the create/edit dialog
- **Create/edit** uses a modal dialog
- **Task list** uses a table layout
- **Theme** is light-only

## Submission notes

Add your own:

1. GitHub repository link
2. Live deployment link (Vercel or Netlify)
3. 3–5 minute screen recording walkthrough
