import { ApiProperty } from "@nestjs/swagger";
import { AppointmentStatus } from "@prisma/client";
import { IsEnum, Validate } from "class-validator";

export function IsNotCancelled(value: any) {
  if (value === AppointmentStatus.CANCELLED) { return false; }
  return true;
}

export class UpdateStatusAppointmentDto {
  @ApiProperty()
  @Validate(IsNotCancelled)
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}