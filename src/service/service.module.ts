import { Module } from "@nestjs/common";
import { SharedRepositoryModule } from "src/shared/repositories/shared-repository.module";
import { ServiceController } from "./controller/service.controller";
import { ServiceService } from "./services/service.service";

@Module({
  imports: [SharedRepositoryModule],
  controllers: [ServiceController],
  providers: [ServiceService]
})

export class ServiceModule { }