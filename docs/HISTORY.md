# HISTORY — archive of finished work

> Append only, oldest first. Nothing here is ever rewritten.
>
> Each entry records: what was created or changed · how it was verified ·
> any trap that was hit and how it was solved.
>
> This file exists so that `PROJECT_STATUS.md` can stay short, and so that a
> problem already solved once is never debugged from zero again.
>
> Last updated: 2026-09-21 (1405/06/30)

---

## Phase 0 — environment and skeleton

### Block 0.1 — install and verify the toolchain

| Step  | What was done                                                                                      | Verified by                                  |
| ----- | -------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 0.1.1 | Node.js + npm confirmed present — they were already installed                                      | `node -v`, `npm -v`                          |
| 0.1.2 | pnpm installed globally                                                                            | `pnpm -v`                                    |
| 0.1.3 | Docker Desktop installed                                                                           | the `hello-world` container ran successfully |
| 0.1.4 | Git updated. `user.name` and `user.email` set. `init.defaultBranch` set to `main`                  | `git --version`, `git config --list`         |
| 0.1.5 | GitHub account created. Private repo created. Remote `origin` added. First commit pushed to `main` | commit visible on GitHub                     |

---

### Block 0.2 — monorepo skeleton

| Step  | What was done                                                                                                                             | Verified by                              |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 0.2.1 | Folder skeleton created: `apps/api`, `apps/web`, `packages/shared`                                                                        | folders visible in VS Code               |
| 0.2.3 | Root `package.json` + `pnpm-workspace.yaml` created                                                                                       | `pnpm hello` ran and printed its message |
| 0.2.4 | Root `tsconfig.json` created with `strict: true`. It is a BASE config: never compiled directly, only extended by child packages (D14)     | file exists, no compile attempted        |
| 0.2.5 | TypeScript `7.0.2` installed as a devDependency at the root, with `-D -w`. No root-level typecheck script: each package typechecks itself | version printed correctly                |

**Numbering note:** 0.2.2 and 0.3.1 were skipped. No work item was ever assigned
to them. This is not a gap in the record.

---

### Block 0.3 — database in Docker

| Step  | What was done                                                                                                                                                                      | Verified by                                                                              |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 0.3.2 | `docker-compose.yml` created at the root: one service `db` — image `postgres:17`, container `tailoring-db`, host port `15432` → container `5432`, named volume `tailoring_db_data` | file exists and parses                                                                   |
| 0.3.3 | Container started for the first time                                                                                                                                               | logs showed `ready to accept connections`                                                |
| 0.3.4 | Connected to Postgres from the shell with `docker compose exec db psql -U tailoring -d tailoring_nb`                                                                               | `SELECT version()` worked · database `tailoring_nb` exists · no tables yet, as expected  |
| 0.3.5 | DB credentials moved out of `docker-compose.yml` into `.env`. `.env.example` created with fake values. The compose file now uses `${VAR}` placeholders (D16)                       | `docker compose config` resolved every value correctly · confirmed `.env` is git-ignored |
| 0.3.6 | pnpm scripts added to the root `package.json`: `db:up`, `db:down`, `db:logs`, `db:psql`, `db:reset` (D17). No new packages installed                                               | all five scripts run correctly                                                           |

**Trap — host port 5433 was unusable.**
Port `5433` is inside a port range reserved by Hyper-V on this specific Windows
machine. It was not occupied by another program — it was forbidden, which looks
identical from the outside. Host port `15432` is outside every reserved range.
Recorded as D15.

---

### Block 0.4 — the API package

| Step   | What was done                                                                                                                                                                                                                                          | Verified by                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| 0.4.1  | The dependency list for `apps/api` was reviewed one package at a time and approved: 9 dependencies + 6 devDependencies, with 6 more deliberately postponed (D18)                                                                                       | user approved each entry                                            |
| 0.4.2  | `apps/api/package.json` created — name `@tailoring/api`, private. All 15 packages installed with `pnpm --filter`. No scripts yet                                                                                                                       | install completed                                                   |
| 0.4.2c | Prisma build scripts approved. Result in `pnpm-workspace.yaml`: `allowBuilds: { '@prisma/engines': true, prisma: true }` (D20)                                                                                                                         | `prisma --version` printed `Operating System : win32` with no error |
| 0.4.3  | `apps/api/tsconfig.json` created. It `extends` the root config (D23) and overrides only: `module`, `moduleResolution`, `declaration: false`, decorators on (D21, D24), `rootDir: ./src`, `outDir: ./dist`. The empty `apps/api/src` folder was created | file exists                                                         |

**Trap — `pnpm approve-builds` silently recorded a rejection.**
What was seen: the command finished, but no package was approved.
Real cause: `Enter` was pressed without first selecting the packages with `Space`.
pnpm treats that as an explicit REJECTION and writes it into
`pnpm-workspace.yaml`, so re-running the command does nothing — it believes the
question is already answered.
Fix: the rejection entry was deleted from `pnpm-workspace.yaml` by hand, then
`pnpm approve-builds` was run again, this time selecting both packages with
`Space` before pressing `Enter`.
**Lesson: in pnpm prompts, `Space` selects and `Enter` submits. `Enter` alone
means "no".**

**Naming note — Prisma 7 renamed a line.**
`prisma --version` now prints `Operating System : win32`. Older documentation
and tutorials call this line `binaryTarget`. Same information, new label.
Nothing is wrong if `binaryTarget` cannot be found.

---

### Block 0.6 — documentation restructure

| Step  | What was done                                                                                                                                                                                                                                                                                                                                                                         | Verified by                                                           |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 0.6.1 | `docs/RULES.md` written (version 2). The line-count limits were removed on purpose: a hard cap of 30 lines was pushing code to be compressed and comments to be dropped, which is the opposite of the goal. Sizing is now judged by whether every line can still be fully explained. Architecture rules were added, and four rules that were hiding inside `STATE.md` were moved here | reviewed and approved by the user                                     |
| 0.6.2 | `docs/ENVIRONMENT.md` written. Tool versions, ports, database facts, Git remote, and the common commands table were moved out of `STATE.md`. Commands are now grouped by area instead of being one flat list                                                                                                                                                                          | all five tool versions re-checked on the machine and matched the file |
| 0.6.3 | `docs/GLOSSARY.md` written. The 10 domain words were carried over unchanged. Two new sections added: technical terms already taught (each with the analogy used), and terms deliberately not introduced yet                                                                                                                                                                           | reviewed and approved                                                 |
| 0.6.4 | `docs/DECISIONS.md` written. D1–D24 carried over word for word, with no rewording. D12 struck through and pointed at D25, keeping the half of it that is still valid. D25 and D26 added                                                                                                                                                                                               | reviewed and approved                                                 |
| 0.6.5 | `docs/HISTORY.md` written — this file                                                                                                                                                                                                                                                                                                                                                 | —                                                                     |

**Why the split happened.**
`STATE.md` was doing three unrelated jobs at once: current status, locked
decisions, and environment reference. Because the status part had to be rewritten
every session, the decisions and the environment facts were put at risk on every
single rewrite. Recorded as D25, superseding D12.

**Secret removed from the documentation.**
The old `STATE.md` contained the local database password in plain text. It is not
carried into the new files. `ENVIRONMENT.md` names the variable instead and
points to `.env`. Recorded as D26.

---

### Block 0.4 — continued

| Step      | What was done                                                                                                                 | Verified by                                                        |
| --------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 0.4.4a    | `apps/api/src/app.module.ts` created: an `AppModule` class with `@Module({ imports: [], controllers: [], providers: [] })`    | `tsc --noEmit` passed with no output, after step 0.4.3-fix         |
| 0.4.3-fix | `"type": "module"` added to `apps/api/package.json`, making the whole API package ESM (D27). `tsconfig.json` needed no change | `pnpm --filter @tailoring/api exec tsc --noEmit` returned silently |

**Trap — NestJS 12 is pure ESM, and the failure arrives in two layers.**

First layer: `error TS5110 — 'module' must be set to 'Node16' when
'moduleResolution' is set to 'Node16'`. Cause: `module` was `commonjs` while
`moduleResolution` was `node16`. TypeScript 7 requires them to be a matching pair.
Fixed by setting both to `node16`.

Second layer, only visible after the first was fixed:
`error TS1479 — the referenced file is an ECMAScript module and cannot be
imported with 'require'`. Cause: with `module: node16`, a file's module type is
decided by the nearest `package.json`. `apps/api/package.json` had no `"type"`
field, and a missing `"type"` means CommonJS. Meanwhile `@nestjs/common` declares
`"type": "module"` with no CommonJS fallback.
Fixed by adding `"type": "module"` to `apps/api/package.json`.

**Lesson: a missing `"type"` field is not an open question — it is an explicit
answer, and that answer is CommonJS.**

**Documentation had drifted from reality.**
Two facts recorded in `PROJECT_STATUS.md` turned out to be stale: TS5110 was
listed as broken although it had already been fixed in an earlier session, and
`apps/api/package.json` was listed as having no scripts although `dev`, `build`
and `start` were already there. Both were found only by reading the real files
with `Get-Content` instead of trusting the notes.
**Lesson: before fixing something the docs call broken, look at the actual file.**

---

### Block 0.6 — closed

| Step  | What was done                                                                                                                                | Verified by                                                         |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 0.6.7 | The old root-level `STATE.md` and `RULES.md` were deleted by the user. Every fact they held now lives in one of the six files under `docs/`. | the repo root contains neither file · `docs/` holds exactly 6 files |

Block 0.6 is now closed. From here on, `docs/` is the only documentation location.

---

### Block 0.4 — continued (2)

| Step   | What was done                                                                                                                                                                                                                                                                                       | Verified by                                                        |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 0.4.4b | `apps/api/src/main.ts` created — the entry point. It imports `NestFactory` and `AppModule`, declares `const API_PORT = 3001`, and an `async function bootstrap()` that awaits `NestFactory.create(AppModule)`, awaits `app.listen(API_PORT)`, then logs the URL. The last line calls `bootstrap()`. | `pnpm --filter @tailoring/api exec tsc --noEmit` returned silently |

**The `.js` extension rule proved itself in practice.**
`main.ts` imports `./app.module.js` while the file on disk is `app.module.ts`.
This is not a typo — it is the direct consequence of D27. In an ESM package the
import path must name the file that will EXIST AT RUNTIME, not the source file.
TypeScript resolves `.js` back to the `.ts` source at compile time.
**Rule of thumb: every relative import inside `apps/api` ends in `.js`.**

**A second documentation drift was confirmed and closed.**
`HISTORY.md` step 0.4.2 says `apps/api/package.json` had "no scripts yet". The
real file was read with `Get-Content` and it already contains three scripts:
`dev` (`nest start --watch`), `build` (`nest build`), `start`
(`node dist/main.js`). They were added at some point without ever being
recorded. They are now documented in `ENVIRONMENT.md` §7.
The 0.4.2 row above is left untouched on purpose: `HISTORY.md` is append-only,
so history is corrected by a later entry, never by editing an older one.

---

### Block 0.4 — continued (3)

| Step         | What was done                                                                                                                | Verified by                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 0.4.4c       | `apps/api/nest-cli.json` created — tells the Nest CLI that the source root is `src` and which tsconfig to use                | `nest build` completed with no output · `apps/api/dist/` produced                     |
| 0.4.4c-fix-a | TypeScript in `apps/api/package.json` downgraded from `^7.0.2` to an exact `6.0.3` (D28, D30)                                | the same `nest build` that had failed one minute earlier now passed unchanged         |
| 0.4.4c-fix-b | TypeScript in the ROOT `package.json` aligned to the same exact `6.0.3`, so the editor and the build tool can never disagree | `pnpm exec tsc --version` → `Version 6.0.3` at the root                               |
| 0.4.4c-run   | The API server was started for the first time with `pnpm api:dev`                                                            | terminal printed `API is listening on http://localhost:3001` · browser returned a 404 |

**Trap — TypeScript 7.0 removed the door that the Nest CLI walks through.**

What was seen: `nest build` failed instantly, while
`tsc --noEmit` had been passing for two steps.

Real cause, printed several lines ABOVE the last line of the output:
`The installed TypeScript version (7.0.2) does not expose the programmatic
compiler API`. A compiler has two separate entry points — the `tsc` executable
that humans type, and a programmatic API that other PROGRAMS call. TypeScript
7.0 ships only the first. The API is expected back in 7.1.

This is why the two commands disagreed without either of them being wrong:

| Entry point               | Used by                            | Present in 7.0 |
| ------------------------- | ---------------------------------- | -------------- |
| `tsc` CLI                 | humans, CI scripts                 | yes            |
| programmatic compiler API | `@nestjs/cli`, `ts-node`, bundlers | no             |

Fix: TypeScript pinned to `6.0.3` in both `package.json` files. Nothing else was
touched, which is what confirms the diagnosis rather than merely working around it.

**Lesson: a green `tsc --noEmit` proves the CODE is fine. It never proved the
TOOLCHAIN is fine, and we had been reading it as if it did.**

**Trap — `pnpm add -E` reported an exact version but did not write one.**
`pnpm add -D -w -E typescript@6.0.3` printed `+ typescript 6.0.3`, yet the file
received `"^6.0.3"`. The summary line reports the version INSTALLED; the file
records the RANGE ACCEPTED. They are different facts and only one of them is
binding for the future. The caret was removed by hand and `pnpm install` was
re-run. Why `-E` had no effect on pnpm 12.4.1 is unknown and is logged as an
open question.
**Lesson: a tool's summary line is not the file. Open the file.**

**The documentation had drifted in four more places.**
All four were found by reading the real file instead of the notes:

1. the root `package.json` already had `api:dev` and `api:build` scripts that
   were never documented — now in `ENVIRONMENT.md` §7;
2. `.gitignore` already covers `dist/` — confirmed by `git status` not listing
   it after the first build. The worry recorded in `PROJECT_STATUS.md` was
   unfounded and is now closed;
3. the startup message is `API is listening on …`, not `… is running on …`;
4. the port constant is named `apiPort`, not `API_PORT`. The real file is the
   correct one here: `RULES.md` §6 reserves `SCREAMING_SNAKE_CASE` for
   environment variables, and this is an in-code constant. The docs were fixed,
   not the code.

**Lesson: this trap is not the user's alone. In this session the ASSISTANT
quoted the docs from memory twice — for the log message and for the port
variable — and was wrong both times. `RULES.md` §0 already forbids it:
never claim to have read a file that was not provided.**

---

### Block 0.4 — continued (4)

| Step   | What was done                                                                                                                                               | Verified by                                                                         |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 0.4.5a | `apps/api/src/health/health.controller.ts` created — a `HealthController` with `@Controller('health')` and one `@Get()` method returning `{ status: 'ok' }` | browser at `http://localhost:3001/health` returned `{"status":"ok"}`                |
| 0.4.5a | `app.module.ts` edited — `HealthController` imported (with the `.js` extension, D27) and registered in the `controllers` array                              | terminal logged `Mapped {/health, GET} route` · `/` still returns 404, as it should |

**Why two files in one step.**
`RULES.md` §3 asks for one file per step, but it also forbids splitting a file in
a way that leaves it untestable. A controller that is never registered in a module
is invisible to NestJS, so there would have been nothing to test. The two files are
one indivisible unit and this was announced before the step started.

**Why the controller returns the object directly, for now.**
`RULES.md` §7 says a controller carries no business logic. Here the "logic" is the
single word `ok`, so a service would have been ceremony with no benefit. It is
corrected in 0.4.5b — deliberately, so that dependency injection is taught on code
that already works rather than on an empty example.

**Encoding scare — resolved, and it was the reader, not the file.**
`Get-Content` rendered the `☑️` in `main.ts` as `â˜‘ï¸`. The file is fine; VS Code
reports UTF-8. `Get-Content` defaults to the Windows ANSI codepage, not UTF-8.
**Lesson: read files containing Persian text or emoji with
`Get-Content -Encoding utf8`, otherwise the terminal invents a problem that
does not exist.**

---

### Block 0.4 — closed

| Step   | What was done                                                                                                                                            | Verified by                                                         |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 0.4.5b | `apps/api/src/health/health.service.ts` created — a `@Injectable()` class holding the `check()` method that was previously inside the controller         | no `Nest can't resolve dependencies` error at startup               |
| 0.4.5b | `health.controller.ts` rewritten — it now declares `constructor(private readonly healthService: HealthService)` and returns `this.healthService.check()` | `GET /health` still returns `{"status":"ok"}` — behaviour unchanged |
| 0.4.5b | `app.module.ts` edited — `HealthService` imported (`.js`, D27) and registered in `providers`                                                             | `AppModule dependencies initialized` logged with a real dependency  |

**Why the output did not change, and why that is the point.**
This step was a refactor: same external behaviour, better internal structure. If
the browser response had changed, something would have been broken. The value is
structural — `RULES.md` §7 requires controller → service → prisma, and the
pattern was learned on code that already worked rather than while also fighting
Prisma in 0.4.6.

**Concept established — dependency injection.**
The controller never writes `new HealthService()`. It declares in its constructor
what it needs, and NestJS's container hands over the single instance it built at
startup. Three problems this avoids:

1. ten controllers calling `new` would create ten instances — and later, ten
   database connections where one was enough;
2. when `HealthService` eventually needs `PrismaService`, the controller would
   have had to know the entire internal structure of something unrelated to it;
3. a hardcoded `new` cannot be swapped for a fake in a test.

`providers` and `controllers` are not interchangeable: `controllers` means
"these answer HTTP requests", `providers` means "build these once and hand them
to whoever asks".

**Block 0.4 is now complete.** The API compiles, starts, listens on port 3001,
answers `GET /health`, and follows the controller → service layering from the
very first endpoint.
