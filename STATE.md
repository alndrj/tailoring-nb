# STATE — Tailoring NB

Updated: 1405/06/24 · Session 3

---

## 0. Environment

OS: Windows 11 (native — Docker uses WSL2 internally, user never works inside WSL)
Editor: VS Code
Project path: E:\Codes\tailoring-nb
Terminal: PowerShell (inside VS Code)
PowerShell execution policy: RemoteSigned (CurrentUser)

| Tool           | Version  | Status                                              |
| -------------- | -------- | --------------------------------------------------- |
| Node.js        | v22.21.0 | ✅ verified                                         |
| npm            | 10.9.4   | ✅ verified                                         |
| pnpm           | 12.4.1   | ✅ verified                                         |
| Docker Desktop | 29.8.0   | ✅ hello-world passed                               |
| Git            | 2.55.0   | ✅ updated, name/email set, init.defaultBranch=main |
| GitHub account | alndrj   | ✅ created                                          |

---

## 0.5 Git / GitHub

Remote name: origin
Remote URL: https://github.com/alndrj/tailoring-nb.git
Visibility: private
Branch: main (upstream tracking already set — plain `git push` works)
Auth: Git Credential Manager, already authorized on this machine
Public showcase repo: ⬜ not created yet (see D11)

---

## 1. Stack (locked)

Language: TypeScript
Backend: NestJS
Database: PostgreSQL + Prisma — runs in Docker, never installed natively
Frontend: Next.js + Tailwind CSS
Repo: monorepo, pnpm workspaces
UI language: Persian (fa), RTL

Mobile: PWA first. Native Android later.
Native technology NOT chosen yet (deferred on purpose).

---

## 2. Where we are

Phase: 0 — Environment + skeleton
Current step: 0.2.3 — root package.json + pnpm-workspace.yaml (not started)
Last commit: 1926dfc — chore: add project rules, state and gitignore files

---

## 2.5 Project structure

E:\Codes\tailoring-nb
├── apps/
│ ├── api/ ← NestJS backend (empty)
│ └── web/ ← Next.js frontend (empty)
├── packages/
│ └── shared/ ← shared types/utils (empty)
├── .gitignore
├── RULES.md ← how the assistant must work
└── STATE.md ← project memory, pasted at session start

> NOTE: the 3 folders above are still empty, so Git does not track them yet.
> Git tracks files, not folders. They will appear on GitHub with their first file.

> RULE: list folders + key files only.
> Never list node_modules, .git, dist, .next, or routine repeated files.
> The assistant regenerates this section at the end of every session.
> If the user creates/moves/renames anything outside the assistant's
> instructions, they MUST say so — otherwise all future paths are wrong.

---

## 3. Done

- 0.1.1 — Node.js + npm verified (were already installed)
- 0.1.2 — pnpm installed globally
- 0.1.3 — Docker Desktop installed, hello-world container ran OK
- 0.1.4 — Git updated, user.name / user.email set, default branch = main
- 0.1.5 — GitHub account + private repo created, remote `origin` added,
  first commit pushed to `main`
- 0.2.1 — monorepo folder skeleton created (apps/api, apps/web, packages/shared)

---

## 4. Next 3 steps only

1. 0.2.3 — root package.json + pnpm-workspace.yaml (defines the monorepo)
2. 0.2.4 — root tsconfig.json (shared TypeScript settings)
3. 0.3.1 — PostgreSQL container via docker-compose.yml

> Never plan more than 3 steps ahead.
> Decide the next block only when the current one is finished.

---

## 5. Locked decisions (do NOT change without explicit discussion)

| #   | Decision                                                          | Why                                                 |
| --- | ----------------------------------------------------------------- | --------------------------------------------------- |
| D1  | Money = integer, Rial only. No floats.                            | floats lose precision on money                      |
| D2  | IDs = UUID (text), not auto-increment numbers                     | safe for sync + multi-device later                  |
| D3  | Every DB query filtered by `workshopId`                           | each workshop must never see another's data         |
| D4  | Soft delete: `deletedAt` column, never hard delete                | user deletes a customer by mistake → recoverable    |
| D5  | Dates stored UTC, displayed Jalali (شمسی)                         | storage and display are different concerns          |
| D6  | No Persian text hardcoded in code. All UI text in one i18n file   | needed for future multi-language + easy edits       |
| D7  | API (NestJS) and UI (Next.js) fully separate                      | any future mobile app can plug into the same API    |
| D8  | No new npm package without asking the user first                  | user must understand every dependency               |
| D9  | All code comments in English. All explanations to user in Persian | code stays standard, learning stays clear           |
| D10 | PostgreSQL runs in Docker, never installed on the OS              | laptop env == server env, no surprises on deploy    |
| D11 | Two GitHub repos: one private (real code), one public (showcase)  | keep business logic private, still have a portfolio |
| D12 | Only 2 markdown files: STATE.md + RULES.md. No LEARN.md           | user takes their own handwritten notes              |
| D13 | Monorepo layout: `apps/` = runnable apps, `packages/` = shared    | industry convention, instantly readable by anyone   |

---

## 6. Glossary (فارسی ↔ code)

| فارسی      | code        |
| ---------- | ----------- |
| خیاط       | tailor      |
| کارگاه     | workshop    |
| مشتری      | customer    |
| اندازه     | measurement |
| سفارش      | order       |
| پارچه      | fabric      |
| پرداخت     | payment     |
| پیش‌پرداخت | deposit     |
| تحویل      | delivery    |
| یادآوری    | reminder    |

---

## 7. MVP — 8 features (titles only, details decided later)

1. customers — دفترچه مشتری‌ها
2. measurements — ثبت اندازه‌ها
3. orders — سفارش‌ها و وضعیتشان
4. photos — عکس پارچه / مدل
5. payments — پیش‌پرداخت و تسویه
6. reminders — یادآوری تحویل
7. reports — گزارش ساده درآمد
8. backup — پشتیبان‌گیری

> Feature details are NOT designed yet. Design each one right before building it.

---

## 8. Deferred / open questions

- Voice input (Persian speech → measurements): Phase 2
- SMS provider: not chosen
- Hosting / server: not chosen
- Native mobile technology: not chosen
- App name and domain: not chosen
- Target city / market: not decided
- Multi-tailor per workshop: assume yes in DB design, build UI later
- Public showcase repo (D11): not created yet

---

## 9. Known issues / tech debt

- none yet
