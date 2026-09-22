// Business logic for the health check, kept away from anything HTTP.
// Today it answers a constant; from 0.4.6 it will also check the database.

import { Injectable } from "@nestjs/common";

@Injectable()
export class HealthService {
  check(): { status: string } {
    return { status: "ok" };
  }
}
