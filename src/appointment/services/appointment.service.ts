import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AuthService } from "src/auth/services/auth.service";
import { ServiceService } from "src/service/services/service.service";
import { CancelAppointmentDto } from "../dto/cancel-appointment.dto";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { UpdateStatusAppointmentDto } from "../dto/update-status-appointment.dto";
import { IAppointmentRepository } from "../repositories/appointment-repository.interface";

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('APPOINTMENT_REPOSITORY')
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly authService: AuthService,
    private readonly serviceService: ServiceService
  ) { }

  async findAll(businessId: string) {
    const business = await this.authService.getBusinessById(businessId)

    if (!business) {
      throw new NotFoundException('Estabelecimento não encontrado')
    }

    return await this.appointmentRepository.findAll(businessId)
  }

  async findOne(appointmentId: string, businessId: string) {
    const business = await this.authService.getBusinessById(businessId)

    if (!business) {
      throw new NotFoundException('Estabelecimento não encontrado')
    }

    return await this.appointmentRepository.findOne(appointmentId, businessId)
  }

  async findByUserId(userId: string, businessId: string) {
    const business = await this.authService.getBusinessById(businessId)

    if (!business) {
      throw new NotFoundException('Estabelecimento não encontrado')
    }

    const user = await this.authService.getUserById(userId)

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return await this.appointmentRepository.findByUserId(userId, businessId)
  }

  async create(businessId: string, createAppointmentDto: CreateAppointmentDto) {
    const { serviceId, employeeId, clientId } = createAppointmentDto

    const business = await this.authService.getBusinessById(businessId)

    if (!business) {
      throw new NotFoundException('Estabelecimento não encontrado')
    }

    const employee = await this.authService.getUserById(employeeId)

    if (!employee) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const client = await this.authService.getUserById(clientId)

    if (!client) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const service = await this.serviceService.findOne(serviceId, businessId)

    if (!service) {
      throw new NotFoundException('Serviço não encontrado')
    }

    return await this.appointmentRepository.create(createAppointmentDto, businessId)
  }

  async updateStatusAppointment(appointmentId: string, businessId: string, updateStatusAppointmentDto: UpdateStatusAppointmentDto) {
    const business = await this.authService.getBusinessById(businessId)

    if (!business) {
      throw new NotFoundException('Estabelecimento não encontrado')
    }

    const appointment = await this.appointmentRepository.findOne(appointmentId, businessId)

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado')
    }

    return await this.appointmentRepository.updateStatus(appointmentId, businessId, updateStatusAppointmentDto)
  }

  async cancelAppointment(appointmentId: string, businessId: string, cancelAppointmentDto: CancelAppointmentDto) {
    const business = await this.authService.getBusinessById(businessId)

    if (!business) {
      throw new NotFoundException('Estabelecimento não encontrado')
    }

    const appointment = await this.appointmentRepository.findOne(appointmentId, businessId)

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado')
    }

    return await this.appointmentRepository.cancelAppointment(appointmentId, businessId, cancelAppointmentDto)
  }

  async delete(appointmentId: string, businessId: string) {
    const business = await this.authService.getBusinessById(businessId)

    if (!business) {
      throw new NotFoundException('Estabelecimento não encontrado')
    }

    const appointment = await this.appointmentRepository.findOne(appointmentId, businessId)

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado')
    }

    return await this.appointmentRepository.delete(appointmentId, businessId)
  }
}