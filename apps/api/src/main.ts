// The entry point of the API: the only file Node.js runs directly.
// Its single job is to build the app from AppModule and start listening.

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

// Host port for the API. TODO: move this into .env (see PROJECT_STATUS tech debt).
const apiPort = 3001;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  await app.listen(apiPort);

  console.log(`☑️ API is listening on http://localhost:${apiPort}`);
}

bootstrap();
