import { CancelAppointmentDto } from "../dto/cancel-appointment.dto";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { UpdateStatusAppointmentDto } from "../dto/update-status-appointment.dto";
import { Appointment } from "../models/business.model";

export interface IAppointmentRepository {
  findAll(businessId: string): Promise<Appointment[]>
  findOne(appointmentId: string, businessId: string): Promise<Appointment | null>
  findByUserId(userId: string, businessId: string): Promise<Appointment[] | null>
  create(createAppointmentDto: CreateAppointmentDto, businessId: string): Promise<void>
  updateStatus(appointmentId: string, businessId: string, updateStatusAppointmentDto: UpdateStatusAppointmentDto): Promise<void>
  cancelAppointment(appointmentId: string, businessId: string, cancelAppointmentDto: CancelAppointmentDto): Promise<void>
  delete(appointmentId: string, businessId: string): Promise<void>
}