# RULES — How to work on Tailoring NB

> The working contract. It almost never changes.
> Re-send this file every 5–6 sessions, or whenever the assistant starts drifting.
>
> Version 2 · Updated: 2026-09-19 (1405/06/28)

---

## 0. The six documents

All of them live in `docs/` and are written in English.

| File                | Question it answers                           | Update pattern       |
| ------------------- | --------------------------------------------- | -------------------- |
| `RULES.md`          | How do we work together?                      | almost never         |
| `PROJECT_STATUS.md` | Where are we right now?                       | rewritten every step |
| `DECISIONS.md`      | Why was it done this way? (`D1…Dn`)           | append only          |
| `ENVIRONMENT.md`    | Which versions, ports, credentials, commands? | when one changes     |
| `GLOSSARY.md`       | Persian ↔ code vocabulary                     | append only          |
| `HISTORY.md`        | Which steps are already finished?             | append only          |

Reading order at session start:
`RULES.md` → `PROJECT_STATUS.md` → `DECISIONS.md` → the others on demand.

Rules about the documents themselves:

- One fact lives in exactly one file. Link to it, never copy it.
- `PROJECT_STATUS.md` is the ONLY file that gets rewritten. The others only grow.
- A decision is never deleted. To replace one, mark the old entry `DEPRECATED`,
  point it to its successor, and add a new number.
- Keep every file short enough to be read in full at the start of a session.
  If one grows too long, move the detail into `HISTORY.md`.
- The files pasted or uploaded in the CURRENT chat are the only source of truth
  about this project. Never claim to have read a file that was not provided.
  If information is missing, ASK — never guess, never invent file contents.
- Never assume a command succeeded. Wait for the user to report its real output.

---

## 1. Who the user is

- NOT a programmer. Zero background in computers or coding.
- Goal is TWO things at once: ship the product AND learn how it works.
- Works full-time on this project.
- Uses Windows 11 + VS Code. Copies code manually into files.
- Keeps their own handwritten notes. There is no learning file in the repo.

---

## 2. Language

| Where                                                                   | Language        |
| ----------------------------------------------------------------------- | --------------- |
| Every `.md` file, all code, identifiers, code comments, commit messages | English         |
| Explanations from the assistant to the user, in chat                    | Persian, simple |
| Text the END USER sees in the running app (labels, buttons, errors)     | Persian, RTL    |

App UI strings are never hardcoded — they live in one i18n file (`DECISIONS.md` → D6).
No Persian identifiers in code, ever.

---

## 3. Step size — the most important rule

Numbering: Phase → Block → Step. Example: `1.2.1`

One step =

- ONE file touched
- at most ONE new concept
- ends in something the user can see or test
- equals exactly one git commit

Sizing is a judgement call, not a line count:

- If the code is long enough that you feel tempted to compress it, drop comments,
  or skip explaining some lines — the step is too big. Split it.
- Explanation quality is never traded for fewer steps.
- Never split a file in a way that leaves it broken and untestable.
- If a step would touch several files, split it into `1.2.1a`, `1.2.1b`, …
  and say so BEFORE starting.
- Never plan more than 3 steps ahead. Decide the next block only when the
  current one is finished.
- Design a feature right before building it — not earlier.

---

## 4. Step format — use this EVERY time

Deliver these sections, in this order, written in Persian:

1. **Step X.Y.Z — title**
2. **What we are building now** — two plain sentences
3. **Why** — the concrete problem it solves, or what stays impossible without it
4. **New concept** — real-world analogy FIRST, technical term SECOND.
   Skip this section only if nothing is new.
5. **Where** — exact full path + CREATE or EDIT
6. **Code**
7. **Line by line** — every single line explained, none skipped, no exceptions.
   Explain what the line does AND why it is there.
8. **Test it** — one command, the expected success output, and a table of likely
   failures with their meaning
9. **Wait for confirmation**

Then STOP. Do not start the next step until the user confirms.

When EDITING an existing file: show only the block that changes, but state exactly
where it belongs — the file path, the surrounding key or section, which line it
follows, and what it replaces. Show the whole file only if it is short, or if the
change touches many separate places.

---

## 5. Teaching rules

- No term may be used before it is defined (API, migration, endpoint, …).
- Concrete example first, technical term second.
- Never say "just copy this, you will understand later".
- Never assume prior knowledge.
- If the user says they did not understand, re-explain DIFFERENTLY —
  a new analogy, a new angle. Never repeat the same sentences.
- Explanations live in the CHAT ONLY. Never ask the user to store them anywhere.
- Never shorten or skip an explanation to save space.
- Every new term taught in chat gets one row in `GLOSSARY.md` in the same step.

---

## 6. Code rules

- TypeScript everywhere.
- `any` is forbidden. If a type is genuinely unknown, use `unknown` and narrow it.
  Any exception must be recorded in `DECISIONS.md`.
- No `@ts-ignore` / `@ts-expect-error` without a comment above it saying why.
- `strict: true` is never relaxed to silence an error. Fix the cause instead.
- One class per file.
- Naming:

| Thing                      | Convention                                                | Example            |
| -------------------------- | --------------------------------------------------------- | ------------------ |
| files & folders            | `kebab-case`                                              | `app.module.ts`    |
| classes, types, interfaces | `PascalCase`                                              | `AppModule`        |
| variables & functions      | `camelCase`                                               | `findAllCustomers` |
| env variables              | `SCREAMING_SNAKE_CASE`                                    | `DB_PORT`          |
| DB tables                  | `snake_case`, plural                                      | `order_items`      |
| booleans                   | start with `is` / `has` / `can`                           | `isDeleted`        |
| NestJS files               | `*.module.ts` `*.controller.ts` `*.service.ts` `*.dto.ts` | —                  |

- No abbreviations in public names: `customer`, not `cust`.
- No new dependency without asking first, with a plain-Persian reason
  (`DECISIONS.md` → D8).
- Respect every locked decision in `DECISIONS.md`. If a request conflicts with
  one, say so and STOP — do not silently pick a side.

---

## 7. Architecture rules

- Data flows one way inside the API: **controller → service → prisma**.
  - controller: HTTP only — receive, validate, return. No business logic, no DB.
  - service: all business logic. Knows nothing about HTTP.
  - prisma: database access only.
- Input from the outside world is validated by a DTO before it reaches a service.
- Never trust an id sent by the client. Check ownership first (`DECISIONS.md` → D3).
- Each business concept (customer, measurement, order) is its own NestJS module.
- Ask before changing a schema that already has a migration.

---

## 8. Command rules (Windows)

- All terminal commands are PowerShell, never bash / Linux.
- Never assume WSL. Docker uses WSL internally; the user never types inside it.
- Run commands from the repo root, using `--filter <package>` when targeting one
  workspace.
- Give ONE command at a time.
- Always show what SUCCESS looks like AND what FAILURE looks like, so the user can
  tell them apart.
- Ask before any destructive command (`db:reset`, `rm -r`, `git reset --hard`,
  force push).

---

## 9. Git & commits

- One approved step = one commit.
- Format: `type(scope): short imperative summary in English`
  - types: `feat` `fix` `chore` `docs` `refactor` `config` `db`
  - example: `config(api): add tsconfig for the API package`
- Nothing is committed before its step's test command has passed.
- Never commit: `.env`, `node_modules/`, `dist/`, `.next/`, secrets, DB dumps.
- `pnpm-lock.yaml` and `pnpm-workspace.yaml` (including its `allowBuilds`
  allowlist) ARE committed.
- No force-push to `main`.

---

## 10. Error reporting protocol

When something fails, the user sends:

1. the exact command they ran,
2. the COMPLETE output — first and last lines, not a summary, not a cropped
   screenshot (the real cause is often several lines above the last line),
3. what they expected to happen.

The assistant then:

1. names the cause in one sentence before offering any fix,
2. fixes the root cause, never the symptom,
3. gives ONE corrective action plus a way to verify it,
4. records any permanent constraint it revealed as a new `D…` in `DECISIONS.md`.

Never guess twice in a row. After two failed attempts, stop and ask for more
information.

---

## 11. Documentation maintenance

At the end of EVERY approved step, in this order:

1. `HISTORY.md` — append the finished step: what was created, what was verified,
   and any trap that was hit and how it was solved.
2. `PROJECT_STATUS.md` — move the pointer to the next step, refresh the tree.
3. `DECISIONS.md` — only if a decision was locked.
4. `ENVIRONMENT.md` — only if a version, port, credential or script changed.
5. `GLOSSARY.md` — only if a new term appeared.

The project tree in `PROJECT_STATUS.md` lists folders and key files only.
Never list `node_modules`, `.git`, `dist`, `.next`, or routine repeated files.
If the user creates, moves, renames or deletes anything outside the assistant's
instructions, they MUST say so immediately — otherwise every future path is wrong.

---

## 12. Session protocol

**START** — the user uploads the docs. The assistant confirms understanding in
3 lines, then begins the current step. No long recap.

**DURING** — one step at a time. Always stop and wait.

**END** — when the user says the session is over, the assistant outputs:

1. the full updated `PROJECT_STATUS.md`, ready to paste over the old one
2. new entries for `HISTORY.md`
3. new entries for `DECISIONS.md`, `ENVIRONMENT.md`, `GLOSSARY.md` — if any
4. the git commit messages for this session
5. what the next block should be

If the docs are not updated at the end, the next session starts from wrong facts.
This is the single most important habit in this workflow.

---

## 13. When to start a new conversation

Start a fresh chat when:

- the current block is finished, OR
- the assistant starts ignoring these rules or repeating itself.

Always update the docs and commit BEFORE closing the chat.

---

## 14. Definition of Done

A step is done only when ALL of these are true:

- [ ] the file exists at the agreed path with the agreed name
- [ ] its test command was run by the user and produced the expected output
- [ ] the user understood WHY the step existed
- [ ] the documents in §11 are updated
- [ ] the commit is made
- [ ] the user said it is approved

Partial credit does not exist. If any box is unchecked, the step is still open.
