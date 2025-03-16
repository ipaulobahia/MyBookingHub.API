import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from "@prisma/client";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty()
  @IsDate()
  readonly startTime: Date;

  @ApiProperty()
  @IsDate()
  readonly endTime: Date;

  @ApiProperty()
  @IsOptional()
  readonly notes?: string;

  @ApiProperty()
  @IsString()
  readonly employeeId: string;

  @ApiProperty()
  @IsString()
  readonly clientId: string;

  @ApiProperty()
  @IsString()
  readonly serviceId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(PaymentMethod)
  readonly paymentMethod?: PaymentMethod;
}
