# PROJECT STATUS — Tailoring NB

> The ONLY file in `docs/` that is rewritten instead of appended to.
> It answers one question: where are we right now?
>
> Nothing here is permanent. Permanent things live in `DECISIONS.md`.
> Finished work lives in `HISTORY.md`. Rules live in `RULES.md`.
>
> Updated: 2026-09-22 (1405/06/31) · session 6

---

## 1. The project in one sentence

A digital notebook for a tailoring workshop: customers, their measurements,
their orders, and the money.

---

## 2. Where we are

|                  |                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------- |
| Phase            | 0 — environment and skeleton                                                        |
| Block            | 0.4 — the API package · **COMPLETE**                                                |
| Next block       | 0.4.6 — the database schema                                                         |
| Blockers         | none                                                                                |
| Currently broken | nothing. The API compiles, starts, and answers `GET /health` with `{"status":"ok"}` |

---

## 3. Current step in detail

Block 0.4 is closed. The next step is designed at the start of the next session,
per `RULES.md` §3 — a feature is designed right before it is built.

### Step 0.4.6 — the first Prisma schema (outline only)

|         |                                                                                             |
| ------- | ------------------------------------------------------------------------------------------- |
| Touches | `apps/api/prisma/schema.prisma` — CREATE · `.env` and `.env.example` — EDIT                 |
| Action  | add `DATABASE_URL`, then define the first model                                             |
| Concept | `ORM` · `migration` · `schema` — all three still on the not-yet-taught list (`GLOSSARY` §3) |
| Note    | will need splitting into 0.4.6a/b/c — it touches three files and carries three new concepts |

---

## 4. Next 3 steps only

| Step   | File                            | Goal                                              |
| ------ | ------------------------------- | ------------------------------------------------- |
| 0.4.6a | `.env` · `.env.example`         | add `DATABASE_URL` · teach connection strings     |
| 0.4.6b | `apps/api/prisma/schema.prisma` | the datasource block + the first model            |
| 0.4.6c | —                               | the first migration · teach `migration` and `ORM` |

Only three steps are planned, on purpose.

---

## 5. Project structure

E:\Codes\tailoring-nb
├── apps/
│ ├── api/ ← NestJS backend · package @tailoring/api
│ │ ├── src/
│ │ │ ├── health/
│ │ │ │ ├── health.controller.ts ← verified · GET /health
│ │ │ │ └── health.service.ts ← verified · the logic behind it
│ │ │ ├── app.module.ts ← verified · registers both
│ │ │ └── main.ts ← verified · entry point · port 3001 (D29)
│ │ ├── nest-cli.json ← verified in 0.4.4c
│ │ ├── package.json ← ESM (D27) · TypeScript pinned 6.0.3 (D28)
│ │ └── tsconfig.json ← valid
│ └── web/ ← Next.js frontend · empty, no package.json yet
├── packages/
│ └── shared/ ← shared types and utils · empty, no package.json yet
├── docs/ ← the six documents (D25)
├── .env ← real values · never committed
├── .env.example ← fake values · committed
├── .gitignore ← verified: covers dist/
├── docker-compose.yml ← the postgres service
├── package.json ← root manifest · db: and api: scripts
├── pnpm-workspace.yaml ← workspace globs + allowBuilds allowlist
├── pnpm-lock.yaml
└── tsconfig.json ← base config · never compiled directly (D14)

`apps/api/dist/` is produced by every build and is correctly git-ignored.
It is never listed here (`RULES.md` §11).

## 6. MVP — 8 features

Titles only. Each one is designed right before it is built, not earlier.

| #   | Feature      | فارسی               |
| --- | ------------ | ------------------- |
| 1   | customers    | دفترچه مشتری‌ها     |
| 2   | measurements | ثبت اندازه‌ها       |
| 3   | orders       | سفارش‌ها و وضعیتشان |
| 4   | photos       | عکس پارچه و مدل     |
| 5   | payments     | پیش‌پرداخت و تسویه  |
| 6   | reminders    | یادآوری تحویل       |
| 7   | reports      | گزارش ساده درآمد    |
| 8   | backup       | پشتیبان‌گیری        |

None of these is started. Phase 0 is still about the skeleton.

---

## 7. Known issues and tech debt

| #   | Issue                                                                                                  | Impact                                                                           | When to pay it                                 |
| --- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ---------------------------------------------- |
| 1   | `.env` has no `DATABASE_URL`                                                                           | Prisma cannot connect                                                            | step 0.4.6, before the first migration         |
| 2   | `apps/web` and `packages/shared` have no `package.json`                                                | pnpm reports `Scope: all 2 workspace projects` — it does not see them at all     | when each one is actually started              |
| 3   | The old `STATE.md` contained the local DB password in plain text, and it is already in the git history | harmless while the repo is private; unacceptable the moment a public repo exists | before creating the public showcase repo (D11) |
| 4   | The API port `3001` is a hardcoded constant in `main.ts` (D29)                                         | production cannot override it without a code edit                                | when `@nestjs/config` is wired up, after 0.4.6 |
| 5   | `@nestjs/config` is installed but not used anywhere yet                                                | an unused dependency is a promise the code has not kept                          | same step as item 4                            |

**Closed:** `dist/` being committed by accident — verified on 2026-09-21 that
`.gitignore` already covers it. No action needed.

---

## 8. Open questions — not decided yet

| Question                                                  | Note                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| ~~API port and Web port~~                                 | DECIDED — API `3001`, Web `3000` reserved. See D29                       |
| Why did `pnpm add -E` not strip the caret on pnpm 12.4.1? | low priority; the manual fix is verified. Matters before relying on `-E` |
|                                                           |
| Measurement field names (chest, waist, ...)               | decide in step 0.4.6 with the first schema, then add to `GLOSSARY.md`    |
| Native mobile technology                                  | PWA first is locked; native is postponed on purpose                      |
| SMS provider                                              | not chosen                                                               |
| Hosting / server                                          | not chosen                                                               |
| App name and domain                                       | not chosen                                                               |
| Target city / market                                      | not decided                                                              |
| Voice input (Persian speech → measurements)               | phase 2                                                                  |
| Multi-tailor per workshop                                 | assume yes in the DB design, build the UI later                          |
| Public showcase repo (D11)                                | not created yet — see §7 item 3 first                                    |
