import { Module } from "@nestjs/common";
import { AppointmentRepository } from "src/appointment/repositories/appointment.repository";

@Module({
  providers: [
    {
      provide: 'APPOINTMENT_REPOSITORY',
      useClass: AppointmentRepository,
    },
  ],
  exports: ['APPOINTMENT_REPOSITORY'],
})
export class SharedRepositoryModule { }