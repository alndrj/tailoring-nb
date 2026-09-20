import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  // AppModule is the root of the dependency tree; Nest reads it
  // and builds every provider/controller declared inside it.
  const app = await NestFactory.create(AppModule);

  // Every route will live under /api  ->  /api/health, /api/customers ...
  app.setGlobalPrefix("api");

  // Let the browser (apps/web) talk to us during development
  app.enableCors({ origin: true, credentials: true });

  // Ctrl+C must close DB connections cleanly
  app.enableShutdownHooks();

  const port = Number(process.env.API_PORT ?? 3000);
  await app.listen(port);

  console.log(`🚀 API ready on http://localhost:${port}/api`);
}

void bootstrap();
