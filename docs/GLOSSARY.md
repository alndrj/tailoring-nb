# GLOSSARY — Persian ↔ code vocabulary

> Two jobs:
>
> 1. one Persian word → exactly one name in code, forever
> 2. a record of every technical term already taught to the user, with the
>    analogy that was used
>
> Append only. A word is never renamed here without renaming it in the code too.
>
> Last updated: 2026-09-22 (1405/06/31)

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

**TypeScript:** `import` · `export` · `--noEmit` · `const` ·
template string (backticks + `${}`) · the `.js` import rule in ESM (D27) ·
programmatic API vs CLI — two doors into the same tool: the CLI is for humans,
the programmatic API is for other programs, and a version can ship one without
the other (D28)· constructor parameter properties — writing `private` or `readonly` on a
constructor parameter makes TypeScript assign it to the instance automatically,
which is why such a constructor has an empty body

**Asynchronous code:** `Promise` (the receipt you get instead of the result) ·
`await` (wait here until the receipt becomes a real value) ·
`async` (the label on a function that is allowed to pause)

**NestJS:** `Module` · root module (`AppModule`) · `Decorator` · `Controller` ·
`Provider` / `Service` · entry point (`main.ts`) · `bootstrap` ·
`NestFactory` (the workshop that turns the blueprint into a running app) ·
`endpoint` — one door into the API: a URL plus a request type. `/health` with
GET and `/health` with POST are two different endpoints. A controller is the
person standing behind the door; the endpoint is the door itself ·
`GET` / `POST` — the request type. GET means "I want to see", POST means
"I want to create". Typing a URL in the browser is always a GET ·
`@Injectable()` — the label that makes a class eligible to be handed to others ·
`dependency injection` — a class declares in its constructor what it needs and
NestJS delivers it. You hire a tailor, you do not build one. Nobody writes `new` ·
`container` — the part of NestJS that builds one instance of every provider at
startup, keeps it, and hands out that same instance on request

**Tooling & infrastructure:** monorepo · workspace / package · container ·
port mapping · named volume · environment drift ·
semantic versioning — `major.minor.patch`, where only a change in the first
number is allowed to break things ·
caret (`^`) — "keep the first number, take the newest of the rest" ·
lockfile — `pnpm-lock.yaml`, the ledger of what was ACTUALLY installed, as
opposed to `package.json` which records what was ASKED FOR ·
watch mode — the tool stays running and rebuilds on every save, so the prompt
never comes back; that is success, not a hang

**Ways of working:** ubiquitous language · ADR (architecture decision record) ·
post-mortem · technical debt · MVP

## 3. Terms deliberately NOT introduced yet

Do not use these in chat until they are taught and moved to section 2.

`dependency injection` · `middleware` · `guard` · `pipe` · `interceptor` ·
`DTO` · `migration` · `seed` · `ORM` · `transaction` · `index`
