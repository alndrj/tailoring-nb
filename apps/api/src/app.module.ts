import { Module } from "@nestjs/common";

/**
 * Root module of the API.
 * It owns nothing yet — feature modules get registered here one by one.
 */
@Module({
  imports: [], // other modules this one needs
  controllers: [], // classes that answer HTTP requests
  providers: [], // classes that hold logic (services, repositories)
})
export class AppModule {}
