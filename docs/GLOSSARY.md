# GLOSSARY — Persian ↔ code vocabulary

> Two jobs:
>
> 1. one Persian word → exactly one name in code, forever
> 2. a record of every technical term already taught to the user
>
> Append only. A word is never renamed here without renaming it in the code too.
>
> Last updated: 2026-09-26 (1405/07/04)

---

## 1. Domain words (the tailoring business)

These names are binding. Use them in tables, classes, files, folders and URLs.
Record newly taught technical terms in section 2; they do not need a separate row.

| فارسی      | code          | notes                                                |
| ---------- | ------------- | ---------------------------------------------------- |
| خیاط       | `tailor`      | the person using the app                             |
| کارگاه     | `workshop`    | the tenant boundary — every query filters by it (D3) |
| مشتری      | `customer`    | never `client`, never `buyer`                        |
| اندازه     | `measurement` | one full set of numbers for one customer             |
| سفارش      | `order`       | never `job`, never `task`, never `request`           |
| پارچه      | `fabric`      | —                                                    |
| پرداخت     | `payment`     | —                                                    |
| پیش‌پرداخت | `deposit`     | a `payment`, not a separate concept                  |
| تحویل      | `delivery`    | —                                                    |
| یادآوری    | `reminder`    | —                                                    |

Naming applied: class `Customer` · file `customer.service.ts` · table `customers`
(see `RULES.md` §6).

Individual measurement field names (chest, waist, ...) are NOT decided yet.
They will be chosen when the measurement model is designed, and added here then.

---

## 2. Technical terms already taught

Recorded after being taught in chat. Do not explain them from zero again — build
on them.

### TypeScript

import-export-/--noEmit-const-template string (backticks + `${}`)-rootDir

### Asynchronous code

Promise-await/async

### NestJS

Module-root module (AppModule)-Decorator-Controller-Provider-Service-entry point(main.ts)-bootstrap-NestFactory-endpoint-GET/POST-@Injectable()-dependency injection-container

### Database & Prisma

ORM-schema-datasource-generator-generated code-connection string-UUID-timestamptz-tenant-migration-prisma_migrations

### Tooling & infrastructure

monorepo-workspace-package-container-port mapping-named volume-environment drift-semantic versioning-caret (`^`)-lockfile-pnpm-lock.yaml

### Ways of working

ubiquitous language-ADR (architecture decision record)-post-mortem-technical debt-MVP

---

## 3. Terms deliberately NOT introduced yet

Do not use these in chat until they are taught and moved to section 2.

middleware-guard-pipe-interceptor-DTO-migration-seed-transaction-index-foreign key-relation-cascade
