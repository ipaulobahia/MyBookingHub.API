import { Module } from "@nestjs/common";
import { SharedRepositoryModule } from "src/shared/repositories/shared-repository.module";
import { AppointmentController } from "./controller/appointment.controller";
import { AppointmentService } from "./services/appointment.service";

@Module({
  imports: [SharedRepositoryModule],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})

export class AppointmentModule { }