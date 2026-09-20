# PROJECT STATUS — Tailoring NB

> The ONLY file in `docs/` that is rewritten instead of appended to.
> It answers one question: where are we right now?
>
> Nothing here is permanent. Permanent things live in `DECISIONS.md`.
> Finished work lives in `HISTORY.md`. Rules live in `RULES.md`.
>
> Updated: 2026-09-19 (1405/06/28) · session 6

---

## 1. The project in one sentence

A digital notebook for a tailoring workshop: customers, their measurements,
their orders, and the money.

---

## 2. Where we are

|                  |                                                  |
| ---------------- | ------------------------------------------------ |
| Phase            | 0 — environment and skeleton                     |
| Block            | 0.6 — documentation restructure                  |
| Current step     | 0.6.7 — retire the old `STATE.md` and `RULES.md` |
| Blockers         | none                                             |
| Currently broken | nothing                                          |

---

## 3. Current step in detail

### Step 0.6.7 — retire the old documentation

|         |                                                          |
| ------- | -------------------------------------------------------- |
| Touches | `STATE.md` and `RULES.md`, both at the repo root         |
| Action  | delete both — every fact in them now lives in `docs/`    |
| Test    | `docs/` holds 6 files · the repo root holds neither file |
| Commit  | `docs: split STATE and RULES into six focused documents` |

Nothing is lost. Where each part went is recorded in `HISTORY.md`, block 0.6.

---

## 4. Next 3 steps only

| Step   | File                             | Goal                                               |
| ------ | -------------------------------- | -------------------------------------------------- | --- |
| 0.4.4b | `apps/api/src/main.ts`           | the bootstrap file: the switch that starts the app |
| 0.4.4c | `apps/api/nest-cli.json`         | tell the Nest tooling where the source lives       |
| 0.4.5  | `apps/api/src/app.controller.ts` | a health endpoint that answers in the browser      |     |

Goal of block 0.4 as a whole: the API server actually starts and prints its port.

Never plan more than 3 steps ahead. The step after 0.4.4c is decided only once
0.4.4c is finished.

---

## 5. Project structure

Folders and key files only. Never list `node_modules`, `.git`, `dist`, `.next`.

```
E:\Codes\tailoring-nb
├── apps/
│   ├── api/                   ← NestJS backend · package @tailoring/api
│   │   ├── src/
│   │   │   └── app.module.ts  ← verified
│   │   ├── package.json       ← ESM (D27) · has dev/build/start scripts
│   │   └── tsconfig.json      ← valid
│   └── web/                   ← Next.js frontend · empty, no package.json yet
├── packages/
│   └── shared/                ← shared types and utils · empty, no package.json yet
├── docs/
│   ├── RULES.md
│   ├── PROJECT_STATUS.md      ← this file
│   ├── DECISIONS.md
│   ├── ENVIRONMENT.md
│   ├── GLOSSARY.md
│   └── HISTORY.md
├── .env                       ← real values · never committed
├── .env.example               ← fake values · committed
├── .gitignore
├── docker-compose.yml         ← the postgres service
├── package.json               ← root manifest · devDeps · db: scripts
├── pnpm-workspace.yaml        ← workspace globs + allowBuilds allowlist
├── pnpm-lock.yaml
├── tsconfig.json              ← base config · never compiled directly (D14)
├── RULES.md                   ← DELETE in step 0.6.7
└── STATE.md                   ← DELETE in step 0.6.7
```

---

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

Ordered by what blocks the most work right now.

| #   | Issue                                                                                                  | Impact                                                                           | When to pay it                                 |
| --- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | ---------------------------------------------- |
| 1   | `.env` has no `DATABASE_URL`                                                                           | Prisma cannot connect                                                            | step 0.4.6, before the first migration         |
| 2   | `apps/web` and `packages/shared` have no `package.json`                                                | pnpm does not see them as workspaces, so `--filter` cannot target them           | when each one is actually started              |
| 3   | The old `STATE.md` contained the local DB password in plain text, and it is already in the git history | harmless while the repo is private; unacceptable the moment a public repo exists | before creating the public showcase repo (D11) |

---

## 8. Open questions — not decided yet

| Question                                    | Note                                                                  |
| ------------------------------------------- | --------------------------------------------------------------------- |
| API port and Web port                       | deliberately postponed; decide during block 0.4                       |
| Measurement field names (chest, waist, ...) | decide in step 0.4.6 with the first schema, then add to `GLOSSARY.md` |
| Native mobile technology                    | PWA first is locked; native is postponed on purpose                   |
| SMS provider                                | not chosen                                                            |
| Hosting / server                            | not chosen                                                            |
| App name and domain                         | not chosen                                                            |
| Target city / market                        | not decided                                                           |
| Voice input (Persian speech → measurements) | phase 2                                                               |
| Multi-tailor per workshop                   | assume yes in the DB design, build the UI later                       |
| Public showcase repo (D11)                  | not created yet — see §7 item 5 first                                 |
