import { HealthController } from "./health/health.controller.js";
import { Module } from "@nestjs/common";
import { HealthService } from "./health/health.service.js";

/**
 * Root module of the API.
 * It owns nothing yet — feature modules get registered here one by one.
 */
@Module({
  imports: [], // other modules this one needs
  controllers: [HealthController], // classes that answer HTTP requests
  providers: [HealthService], // classes that hold logic (services, repositories)
})
export class AppModule {}
