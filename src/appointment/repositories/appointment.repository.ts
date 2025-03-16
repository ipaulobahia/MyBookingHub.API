import { Injectable } from "@nestjs/common";
import { Appointment } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";
import { CancelAppointmentDto } from "../dto/cancel-appointment.dto";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { UpdateStatusAppointmentDto } from "../dto/update-status-appointment.dto";
import { IAppointmentRepository } from "./appointment-repository.interface";

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(private prisma: PrismaService) { }

  async findAll(businessId: string): Promise<Appointment[]> {
    return await this.prisma.appointment.findMany({
      where: { businessId }
    })
  }

  async findOne(appointmentId: string, businessId: string): Promise<Appointment | null> {
    return await this.prisma.appointment.findUnique({
      where: { id: appointmentId, businessId }
    })
  }

  async findByUserId(userId: string, businessId: string): Promise<Appointment[] | null> {
    return await this.prisma.appointment.findMany({
      where: {
        businessId,
        OR: [
          { employeeId: userId },
          { clientId: userId }
        ]
      }
    })
  }

  async create(createAppointmentDto: CreateAppointmentDto, businessId: string): Promise<void> {
    const { clientId, employeeId, endTime, serviceId, startTime, notes, paymentMethod } = createAppointmentDto

    await this.prisma.appointment.create({
      data: {
        clientId,
        employeeId,
        endTime,
        startTime,
        serviceId,
        notes,
        businessId,
        paymentMethod
      }
    })
  }

  async updateStatus(appointmentId: string, businessId: string, updateStatusAppointmentDto: UpdateStatusAppointmentDto): Promise<void> {
    const { status } = updateStatusAppointmentDto

    await this.prisma.appointment.update({
      where: {
        id: appointmentId,
        businessId
      },
      data: {
        status
      }
    })
  }

  async cancelAppointment(appointmentId: string, businessId: string, cancelAppointmentDto: CancelAppointmentDto): Promise<void> {
    const { cancelReason } = cancelAppointmentDto

    await this.prisma.appointment.update({
      where: {
        id: appointmentId,
        businessId
      },
      data: {
        cancelReason,
        status: "CANCELLED",
        cancelledAt: new Date()
      }
    })
  }

  async delete(appointmentId: string, businessId: string): Promise<void> {
    await this.prisma.appointment.delete({
      where: {
        id: appointmentId,
        businessId
      }
    })
  }
}