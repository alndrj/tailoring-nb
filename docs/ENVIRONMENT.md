# ENVIRONMENT — machines, versions, ports, commands

> Facts only. No rules (see `RULES.md`), no reasoning (see `DECISIONS.md`).
> Whenever a version, port or script changes, update it here in the SAME commit.
>
> Last verified: 2026-09-25 (1405/07/03)

---

## 1. Machine

|                             |                              |
| --------------------------- | ---------------------------- |
| OS                          | Windows 11 (native)          |
| Editor                      | VS Code                      |
| Terminal                    | PowerShell, inside VS Code   |
| PowerShell execution policy | `RemoteSigned` (CurrentUser) |
| Project path                | `E:\Codes\tailoring-nb`      |

Docker uses WSL2 internally. The user never types commands inside WSL.

---

## 2. Tool versions

| Tool             | Version            | Verified how                                            |
| ---------------- | ------------------ | ------------------------------------------------------- |
| Node.js          | `v22.21.0`         | `node -v`                                               |
| npm              | `10.9.4`           | `npm -v`                                                |
| pnpm             | `12.4.1`           | `pnpm -v`                                               |
| Docker Desktop   | `29.8.0`           | `docker --version` · hello-world container passed       |
| Git              | `2.55.0.windows.5` | `git --version`                                         |
| TypeScript       | `6.0.3`            | `pnpm exec tsc --version` · pinned exactly (D28, D30)   |
| Prisma CLI       | `7.10.0`           | `prisma --version` → reports `Operating System : win32` |
| `@prisma/client` | `7.10.0`           | must always match the CLI exactly                       |
| `@nestjs/core`   | `12.0.3`           | `pnpm --filter @tailoring/api list @nestjs/core`        |

Git is configured with `user.name`, `user.email`, and `init.defaultBranch = main`.

---

## 3. Packages in the monorepo

| Path              | Package name     | State        |
| ----------------- | ---------------- | ------------ |
| `apps/api`        | `@tailoring/api` | in progress  |
| `apps/web`        | not created yet  | empty folder |
| `packages/shared` | not created yet  | empty folder |

The full approved dependency list for `apps/api` lives in `DECISIONS.md` → D18.

---

## 4. Ports

| Service       | Host port       | Container port | Source                                    |
| ------------- | --------------- | -------------- | ----------------------------------------- |
| PostgreSQL    | `15432`         | `5432`         | `${DB_PORT}` in `docker-compose.yml`      |
| API (NestJS)  | `3001`          | —              | `apiPort` in `apps/api/src/main.ts` (D29) |
| Web (Next.js) | `3000` reserved | —              | Next.js default · phase 1                 |

Host port `5433` is unusable on this machine: it falls inside a Hyper-V reserved
port range. See `DECISIONS.md` → D15.

---

## 5. Database (local development)

|                |                                                  |
| -------------- | ------------------------------------------------ |
| Engine image   | `postgres:17`                                    |
| Container name | `tailoring-db`                                   |
| Restart policy | `unless-stopped`                                 |
| Named volume   | `tailoring_db_data` → `/var/lib/postgresql/data` |
| Host           | `localhost`                                      |
| Host port      | `15432`                                          |
| Database name  | `tailoring_nb`                                   |
| User           | `tailoring`                                      |
| Password       | in `.env` → `POSTGRES_PASSWORD`                  |

Data survives `pnpm db:down` because it lives in the named volume,
not inside the container.

### Environment variables

| Variable            | Read by                     | Purpose                                 |
| ------------------- | --------------------------- | --------------------------------------- |
| `POSTGRES_USER`     | `docker-compose.yml`        | database user                           |
| `POSTGRES_PASSWORD` | `docker-compose.yml`        | database password                       |
| `POSTGRES_DB`       | `docker-compose.yml`        | database name created on first start    |
| `DB_PORT`           | `docker-compose.yml`        | host port mapped to container port 5432 |
| `DATABASE_URL`      | `apps/api/prisma.config.ts` | the full Prisma connection string       |

All of them live in the ROOT `.env`, not in `apps/api/`.
Real values live in `.env` (git-ignored).
Fake values live in `.env.example` (committed).
See `DECISIONS.md` → D16.

`DATABASE_URL` has the shape:
`postgresql://USER:PASSWORD@localhost:15432/tailoring_nb?schema=public`

---

## 6. Prisma setup

|                       |                                                                 |
| --------------------- | --------------------------------------------------------------- |
| Schema file           | `apps/api/prisma/schema.prisma`                                 |
| Config file           | `apps/api/prisma.config.ts`                                     |
| Generator provider    | `prisma-client` (the modern one, not `prisma-client-js`)        |
| Generated client path | `apps/api/src/generated/prisma` — git-ignored (D32)             |
| Datasource block      | carries `provider` only · the URL comes from `prisma.config.ts` |
| Migrations folder     | `apps/api/prisma/migrations/` — does not exist yet              |
| Models defined        | `Workshop` → table `workshops`                                  |

Prisma 7 no longer reads `.env` by itself. `prisma.config.ts` calls
`process.loadEnvFile()` on the repo-root `.env` before the CLI runs.
Because of this, `prisma.config.ts` must never be passed to the emitting
compiler — see `DECISIONS.md` → D41.

---

## 7. TypeScript configuration layout

| File                           | Role                                               | Emits |
| ------------------------------ | -------------------------------------------------- | ----- |
| `tsconfig.json` (root)         | base config · never compiled directly (D14)        | —     |
| `apps/api/tsconfig.json`       | editor only · sees `prisma.config.ts` · `noEmit`   | no    |
| `apps/api/tsconfig.build.json` | the ONLY config that emits · `src/` only (D41,D42) | yes   |

`apps/api/nest-cli.json` points at `tsconfig.build.json`.

---

## 8. Common commands

Run every command from the repo root: `E:\Codes\tailoring-nb`

### Database

| Command         | What it does                                |
| --------------- | ------------------------------------------- |
| `pnpm db:up`    | start the database in the background        |
| `pnpm db:down`  | stop the database (data is kept)            |
| `pnpm db:logs`  | watch database logs live — `Ctrl+C` to exit |
| `pnpm db:psql`  | open a SQL shell inside the container       |
| `pnpm db:reset` | DESTROY all data and start fresh ⚠️         |

### Prisma

Run with `pnpm --filter @tailoring/api exec prisma <command>`.

| Command                            | What it does                                         |
| ---------------------------------- | ---------------------------------------------------- |
| `prisma validate`                  | check the schema for errors · writes nothing         |
| `prisma format`                    | reformat the schema file in place                    |
| `prisma generate`                  | rebuild the typed client into `src/generated/prisma` |
| `prisma migrate dev --name <name>` | create + apply a migration in development            |
| `prisma migrate status`            | show which migrations are applied                    |
| `prisma studio`                    | open a browser table viewer                          |
| `prisma migrate reset`             | DESTROY the schema and replay everything ⚠️          |

The database container must be running first (`pnpm db:up`).

### Workspace

| Command                              | What it does                             |
| ------------------------------------ | ---------------------------------------- |
| `pnpm install`                       | install everything declared in the repo  |
| `pnpm --filter <pkg> add <name>`     | add a dependency to ONE package          |
| `pnpm --filter <pkg> add -D <name>`  | add a dev dependency to ONE package      |
| `pnpm --filter <pkg> exec <cmd>`     | run a tool installed inside that package |
| `pnpm --filter <pkg> list --depth 0` | list that package's direct dependencies  |

### Type checking

| Command                                          | What it does                            |
| ------------------------------------------------ | --------------------------------------- |
| `pnpm --filter @tailoring/api exec tsc --noEmit` | type-check the API only, write no files |

No output means success.

### API scripts

Declared inside `apps/api/package.json`. Run them from the repo root:

| Command                              | What it does                                                             |
| ------------------------------------ | ------------------------------------------------------------------------ |
| `pnpm --filter @tailoring/api dev`   | `nest start --watch` — restarts on every file save                       |
| `pnpm --filter @tailoring/api build` | `nest build` — compiles `src/` into `dist/`                              |
| `pnpm --filter @tailoring/api start` | `node dist/main.js` — runs the compiled output                           |
| `pnpm api:dev`                       | shortcut for `dev`, declared in the ROOT `package.json` · `Ctrl+C` stops |
| `pnpm api:build`                     | shortcut for `build`, declared in the ROOT `package.json`                |

All of them need `apps/api/nest-cli.json`, created in step 0.4.4c.

### Install-script approval

| Command               | What it does                                  |
| --------------------- | --------------------------------------------- |
| `pnpm approve-builds` | allow a package to run its install scripts    |
| `pnpm rebuild`        | re-run install scripts without re-downloading |

---

## 9. Notes about this machine's tooling

- pnpm 12 prints `Lockfile passes supply-chain policies` on every install.
  This is normal and needs no configuration.
- Prisma 7 prints `Operating System : win32`. Older documentation calls this
  line `binaryTarget` — same thing, renamed.
- Prisma 7 does NOT auto-load `.env`. Anything that needs `DATABASE_URL` must
  load it explicitly.
- The PowerShell execution policy must stay at `RemoteSigned` or higher,
  otherwise `pnpm.ps1` will refuse to run.
- `pnpm add -E` did NOT strip the caret on pnpm 12.4.1. It reported the exact
  version but wrote a range. After pinning a version, always open the file and
  check (D30).
- Read files containing Persian text or emoji with `Get-Content -Encoding utf8`,
  otherwise the terminal shows mojibake that is not in the file.
