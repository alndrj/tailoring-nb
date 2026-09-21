# ENVIRONMENT — machines, versions, ports, commands

> Facts only. No rules (see `RULES.md`), no reasoning (see `DECISIONS.md`).
> Whenever a version, port or script changes, update it here in the SAME commit.
>
> Last verified: 2026-09-21 (1405/06/30)

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

| Tool           | Version            | Verified how                                            |
| -------------- | ------------------ | ------------------------------------------------------- |
| Node.js        | `v22.21.0`         | `node -v`                                               |
| npm            | `10.9.4`           | `npm -v`                                                |
| pnpm           | `12.4.1`           | `pnpm -v`                                               |
| Docker Desktop | `29.8.0`           | `docker --version` · hello-world container passed       |
| Git            | `2.55.0.windows.5` | `git --version`                                         |
| TypeScript     | `6.0.3`            | `pnpm exec tsc --version` · pinned exactly (D28, D30)   |
| Prisma CLI     | `7.10.0`           | `prisma --version` → reports `Operating System : win32` |
| `@nestjs/core` | `12.0.3`           | `pnpm --filter @tailoring/api list @nestjs/core`        |

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

### Environment variables used by `docker-compose.yml`

| Variable            | Purpose                                             |
| ------------------- | --------------------------------------------------- |
| `POSTGRES_USER`     | database user                                       |
| `POSTGRES_PASSWORD` | database password                                   |
| `POSTGRES_DB`       | database name created on first start                |
| `DB_PORT`           | host port mapped to container port 5432             |
| `DATABASE_URL`      | NOT PRESENT YET — Prisma will need it in step 0.4.6 |

Real values live in `.env` (git-ignored).
Fake values live in `.env.example` (committed).
See `DECISIONS.md` → D16.

---

## 6. Git / GitHub

|                      |                                                            |
| -------------------- | ---------------------------------------------------------- |
| Remote name          | `origin`                                                   |
| Remote URL           | `https://github.com/alndrj/tailoring-nb.git`               |
| Visibility           | private                                                    |
| Default branch       | `main`, upstream tracking already set                      |
| Auth                 | Git Credential Manager, already authorized on this machine |
| Public showcase repo | not created yet — see `DECISIONS.md` → D11                 |

Because upstream tracking is set, a plain `git push` is enough.

---

## 7. Common commands

Run every command from the repo root: `E:\Codes\tailoring-nb`

### Database

| Command         | What it does                                |
| --------------- | ------------------------------------------- |
| `pnpm db:up`    | start the database in the background        |
| `pnpm db:down`  | stop the database (data is kept)            |
| `pnpm db:logs`  | watch database logs live — `Ctrl+C` to exit |
| `pnpm db:psql`  | open a SQL shell inside the container       |
| `pnpm db:reset` | DESTROY all data and start fresh ⚠️         |

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

| Command                              | What it does                                                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm --filter @tailoring/api dev`   | `nest start --watch` — restarts on every file save                                                                              |
| `pnpm --filter @tailoring/api build` | `nest build` — compiles `src/` into `dist/`                                                                                     |
| `pnpm --filter @tailoring/api start` | `node dist/main.js` — runs the compiled output                                                                                  |
| `pnpm api:dev`                       | shortcut for the `dev` script above — declared in the ROOT `package.json`. Does not return to the prompt; stop it with `Ctrl+C` |
| `pnpm api:build`                     | shortcut for the `build` script above — declared in the ROOT `package.json`                                                     |

All three need `apps/api/nest-cli.json`, created in step 0.4.4c.
The three `apps/api` scripts and the two root shortcuts all existed before they
were documented — see `HISTORY.md`, block 0.4 continued (2) and (3).

### Install-script approval

| Command               | What it does                                  |
| --------------------- | --------------------------------------------- |
| `pnpm approve-builds` | allow a package to run its install scripts    |
| `pnpm rebuild`        | re-run install scripts without re-downloading |

---

## 8. Notes about this machine's tooling

- pnpm 12 prints `Lockfile passes supply-chain policies` on every install.
  This is normal and needs no configuration.
- Prisma 7 prints `Operating System : win32`. Older documentation calls this
  line `binaryTarget` — same thing, renamed.
- The PowerShell execution policy must stay at `RemoteSigned` or higher,
  otherwise `pnpm.ps1` will refuse to run.
- `pnpm add -E` did NOT strip the caret on pnpm 12.4.1. It reported the exact
  version but wrote a range. After pinning a version, always open the file and
  check (D30).
