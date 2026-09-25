import { join } from "node:path";
import { defineConfig, env } from "prisma/config";

// Prisma 7 does not read .env automatically, and our .env lives at the repo
// root while this package sits in apps/api. Load it explicitly, before the
// config object below asks for any variable.
process.loadEnvFile(join(import.meta.dirname, "../../.env"));

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
