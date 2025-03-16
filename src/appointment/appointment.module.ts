import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AuthService } from "src/auth/services/auth.service";
import { ServiceService } from "src/service/services/service.service";
import { SharedRepositoryModule } from "src/shared/repositories/shared-repository.module";
import { AppointmentController } from "./controller/appointment.controller";
import { AppointmentService } from "./services/appointment.service";

@Module({
  imports: [SharedRepositoryModule, HttpModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, ServiceService, AuthService]
})

export class AppointmentModule { }