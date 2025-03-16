import { Module } from "@nestjs/common";
import { AppointmentRepository } from "src/appointment/repositories/appointment.repository";
import { ServiceRepository } from "src/service/repositories/service.repository";

@Module({
  providers: [
    {
      provide: 'SERVICE_REPOSITORY',
      useClass: ServiceRepository,
    },
    {
      provide: 'APPOINTMENT_REPOSITORY',
      useClass: AppointmentRepository,
    },
  ],
  exports: ['APPOINTMENT_REPOSITORY', 'SERVICE_REPOSITORY'],
})
export class SharedRepositoryModule { }