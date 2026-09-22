// The health endpoint: the simplest possible proof that the API is alive.
// It only handles HTTP; the answer itself comes from HealthService.

import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./health.service.js";

@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  check(): { status: string } {
    return this.healthService.check();
  }
}
