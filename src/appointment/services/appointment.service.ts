import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CancelAppointmentDto } from "../dto/cancel-appointment.dto";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { UpdateStatusAppointmentDto } from "../dto/update-status-appointment.dto";
import { IAppointmentRepository } from "../repositories/appointment-repository.interface";

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('APPOINTMENT_REPOSITORY')
    private readonly appointmentRepository: IAppointmentRepository
  ) { }

  async findAll(businessId: string) {
    // TODO: Validar se o estabelecimento existe.
    // const business = await this.authClient(businessId)

    // if (!business) {
    //   throw new NotFoundException('Estabelecimento não encontrado')
    // }

    return await this.appointmentRepository.findAll(businessId)
  }

  async findOne(appointmentId: string, businessId: string) {
    // TODO: Validar se o estabelecimento existe.
    // const business = await this.authClient(businessId)

    // if (!business) {
    //   throw new NotFoundException('Estabelecimento não encontrado')
    // }

    return await this.appointmentRepository.findOne(appointmentId, businessId)
  }

  async findByUserId(userId: string, businessId: string) {
    // TODO: Validar se o estabelecimento existe.
    // const business = await this.authClient(businessId)

    // if (!business) {
    //   throw new NotFoundException('Estabelecimento não encontrado')
    // }

    // TODO: Validar se o usuário existe.
    // const user = await this.authClient(userId)

    // if (!user) {
    //   throw new NotFoundException('Usuário não encontrado')
    // }

    return await this.appointmentRepository.findByUserId(userId, businessId)
  }

  async create(businessId: string, createAppointmentDto: CreateAppointmentDto) {
    // TODO: Validar se o estabelecimento existe.
    // const business = await this.authClient(businessId)

    // if (!business) {
    //   throw new NotFoundException('Estabelecimento não encontrado')
    // }

    // TODO: Validar se o funcionário existe.
    // const employee = await this.authClient(employeeId)

    // if (!employee) {
    //   throw new NotFoundException('Usuário não encontrado')
    // }

    // TODO: Validar se o cliente existe.
    // const client = await this.authClient(clientId)

    // if (!client) {
    //   throw new NotFoundException('Usuário não encontrado')
    // }

    // TODO: Validar se o serviço existe.
    // const service = await this.service.findOne(serviceId)

    // if (!service) {
    //   throw new NotFoundException('Serviço não encontrado')
    // }

    return await this.appointmentRepository.create(createAppointmentDto, businessId)
  }

  async updateStatusAppointment(appointmentId: string, businessId: string, updateStatusAppointmentDto: UpdateStatusAppointmentDto) {
    // TODO: Validar se o estabelecimento existe.
    // const business = await this.authClient(businessId)

    // if (!business) {
    //   throw new NotFoundException('Estabelecimento não encontrado')
    // }

    const appointment = await this.appointmentRepository.findOne(appointmentId, businessId)

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado')
    }

    return await this.appointmentRepository.updateStatus(appointmentId, businessId, updateStatusAppointmentDto)
  }

  async cancelAppointment(appointmentId: string, businessId: string, cancelAppointmentDto: CancelAppointmentDto) {
    // TODO: Validar se o estabelecimento existe.
    // const business = await this.authClient(businessId)

    // if (!business) {
    //   throw new NotFoundException('Estabelecimento não encontrado')
    // }

    const appointment = await this.appointmentRepository.findOne(appointmentId, businessId)

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado')
    }

    return await this.appointmentRepository.cancelAppointment(appointmentId, businessId, cancelAppointmentDto)
  }

  async delete(appointmentId: string, businessId: string) {
    // TODO: Validar se o estabelecimento existe.
    // const business = await this.authClient(businessId)

    // if (!business) {
    //   throw new NotFoundException('Estabelecimento não encontrado')
    // }

    const appointment = await this.appointmentRepository.findOne(appointmentId, businessId)

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado')
    }

    return await this.appointmentRepository.delete(appointmentId, businessId)
  }
}