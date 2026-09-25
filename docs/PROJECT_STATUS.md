# PROJECT STATUS — Tailoring NB

> The ONLY file in `docs/` that is rewritten instead of appended to.
> It answers one question: where are we right now?
>
> Nothing here is permanent. Permanent things live in `DECISIONS.md`.
> Finished work lives in `HISTORY.md`. Rules live in `RULES.md`.
>
> Updated: 2026-09-25 (1405/07/03) · session 7

---

## 1. The project in one sentence

A digital notebook for a tailoring workshop: customers, their measurements,
their orders, and the money.

---

## 2. Where we are

|                  |                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------- |
| Phase            | 0 — environment and skeleton                                                          |
| Block            | 0.4.6 — the database schema · **in progress**                                         |
| Next step        | 0.4.6d — the first migration                                                          |
| Blockers         | none                                                                                  |
| Currently broken | nothing. The API compiles and answers `GET /health`. Prisma is configured but unused. |

---

## 3. Current step in detail

### Step 0.4.6d — the first migration

|         |                                                                               |
| ------- | ----------------------------------------------------------------------------- |
| Touches | `apps/api/prisma/migrations/` — CREATED BY THE TOOL, not by hand              |
| Action  | run `prisma migrate dev` so the `workshops` table actually exists in Postgres |
| Concept | `migration` — the versioned, replayable history of the database's shape       |
| Why now | the schema is written and type-checks, but no real table exists yet           |

After that, step 0.4.7 wires Prisma into NestJS as a proper injectable service.

---

## 4. Next 3 steps only

| Step   | File                             | Goal                                                |
| ------ | -------------------------------- | --------------------------------------------------- |
| 0.4.6d | `prisma/migrations/` (generated) | first migration · teach `migration`                 |
| 0.4.7a | `src/prisma/prisma.service.ts`   | a `PrismaService` that connects on startup          |
| 0.4.7b | `src/prisma/prisma.module.ts`    | make it global so every future module can inject it |

Only three steps are planned, on purpose.

---

## 5. Project structure

E:\Codes\tailoring-nb
├── apps/
│ ├── api/ ← NestJS backend · package @tailoring/api
│ │ ├── prisma/
│ │ │ └── schema.prisma ← generator + datasource + model Workshop
│ │ ├── src/
│ │ │ ├── generated/prisma/ ← Prisma client output · git-ignored (D32)
│ │ │ ├── health/
│ │ │ │ ├── health.controller.ts ← verified · GET /health
│ │ │ │ └── health.service.ts ← verified · the logic behind it
│ │ │ ├── app.module.ts ← verified · registers both
│ │ │ └── main.ts ← verified · entry point · port 3001 (D29)
│ │ ├── nest-cli.json ← points at tsconfig.build.json (D41)
│ │ ├── package.json ← ESM (D27) · TypeScript pinned 6.0.3 (D28)
│ │ ├── prisma.config.ts ← loads the root .env itself · never compiled
│ │ ├── tsconfig.json ← editor only · noEmit (D41)
│ │ └── tsconfig.build.json ← the only config that emits (D41, D42)
│ └── web/ ← Next.js frontend · empty, no package.json yet
├── packages/
│ └── shared/ ← shared types and utils · empty, no package.json yet
├── docs/ ← the six documents (D25)
├── .env ← real values · has DATABASE_URL · never committed
├── .env.example ← fake values · committed
├── .gitignore ← covers dist/ and src/generated/
├── docker-compose.yml ← the postgres service
├── package.json ← root manifest · db: and api: scripts
├── pnpm-workspace.yaml ← workspace globs + allowBuilds allowlist
├── pnpm-lock.yaml
└── tsconfig.json ← base config · never compiled directly (D14)

`apps/api/dist/` and `apps/api/src/generated/` are produced by tooling and are
correctly git-ignored. They are never listed as source (`RULES.md` §11).

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

| #   | Issue                                                                              | Impact                                                                       | When to pay it                                 |
| --- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------- |
| 1   | `Workshop` is the only model · no customers, orders or tenant scoping yet          | nothing can be built on top of it until the tenant root is migrated          | step 0.4.6d, then block 0.5                    |
| 2   | `apps/web` and `packages/shared` have no `package.json`                            | pnpm reports `Scope: all 2 workspace projects` — it does not see them at all | when each one is actually started              |
| 3   | The old `STATE.md` contained the local DB password in plain text, still in history | harmless while private; unacceptable the moment a public repo exists         | before creating the public showcase repo (D11) |
| 4   | The API port `3001` is a hardcoded constant in `main.ts` (D29)                     | production cannot override it without a code edit                            | when `@nestjs/config` is wired up              |
| 5   | `@nestjs/config` is installed but not used anywhere yet                            | an unused dependency is a promise the code has not kept                      | same step as item 4                            |
| 6   | `.env.example` has no trailing newline                                             | cosmetic: every future edit to its last line shows as a two-line diff        | any time                                       |

**Closed:** `.env` had no `DATABASE_URL` — added in 0.4.6a.
**Closed:** `dist/` being committed by accident — `.gitignore` already covers it.

---

## 8. Open questions — not decided yet

| Question                                                  | Note                                                                     |
| --------------------------------------------------------- | ------------------------------------------------------------------------ |
| ~~API port and Web port~~                                 | DECIDED — API `3001`, Web `3000` reserved. See D29                       |
| Why did `pnpm add -E` not strip the caret on pnpm 12.4.1? | low priority; the manual fix is verified. Matters before relying on `-E` |
| Measurement field names (chest, waist, ...)               | decide when the measurement model is designed, then add to `GLOSSARY.md` |
| How tenant scoping is enforced (middleware vs. explicit)  | decide when the second model arrives, not before                         |
| Native mobile technology                                  | PWA first is locked; native is postponed on purpose                      |
| SMS provider                                              | not chosen                                                               |
| Hosting / server                                          | not chosen                                                               |
| App name and domain                                       | not chosen                                                               |
| Target city / market                                      | not decided                                                              |
| Voice input (Persian speech → measurements)               | phase 2                                                                  |
| Multi-tailor per workshop                                 | assume yes in the DB design, build the UI later                          |
| Public showcase repo (D11)                                | not created yet — see §7 item 3 first                                    |
