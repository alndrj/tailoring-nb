# GLOSSARY — Persian ↔ code vocabulary

> Two jobs:
>
> 1. one Persian word → exactly one name in code, forever
> 2. a record of every technical term already taught to the user, with the
>    analogy that was used
>
> Append only. A word is never renamed here without renaming it in the code too.
>
> Last updated: 2026-09-19 (1405/06/28)

---

## 1. Domain words (the tailoring business)

These names are binding. Use them in tables, classes, files, folders and URLs.

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
They will be chosen in step 0.4.6 with the first schema, and added here then.

---

## 2. Technical terms already taught

These have been explained in chat with a real-world analogy. Do not explain them
from zero again — build on them.

**NestJS:** `Module` · root module (`AppModule`) · `Decorator` · `Controller` ·
`Provider` / `Service`

**TypeScript:** `import` · `export` · `--noEmit`

**Tooling & infrastructure:** monorepo · workspace / package · container ·
port mapping · named volume · environment drift

**Ways of working:** ubiquitous language · ADR (architecture decision record) ·
post-mortem · technical debt · MVP

## 3. Terms deliberately NOT introduced yet

Do not use these in chat until they are taught and moved to section 2.

`dependency injection` · `middleware` · `guard` · `pipe` · `interceptor` ·
`DTO` · `migration` · `seed` · `endpoint` · `ORM` · `transaction` · `index`
