import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetBusinessId } from "src/auth/decorators/get-business-id.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CancelAppointmentDto } from "../dto/cancel-appointment.dto";
import { CreateAppointmentDto } from "../dto/create-appointment.dto";
import { UpdateStatusAppointmentDto } from "../dto/update-status-appointment.dto";
import { AppointmentService } from "../services/appointment.service";

@ApiTags('Appointment')
@Controller('appointment')
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @ApiOperation({ summary: 'Busque todos os agendamentos' })
  @ApiResponse({ status: 200, isArray: true })
  @ApiBearerAuth('access-token')
  @Get()
  findAll(@GetBusinessId() businessId: string) {
    return this.appointmentService.findAll(businessId)
  }

  @ApiOperation({ summary: 'Busque um  agendamentos pelo seu id' })
  @ApiResponse({ status: 200, isArray: true })
  @ApiBearerAuth('access-token')
  @Get(':id')
  findOne(@GetBusinessId() businessId: string, @Param('id') appointmentId: string) {
    return this.appointmentService.findOne(appointmentId, businessId)
  }

  @ApiOperation({ summary: 'Crie um agendamento' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  @Post()
  create(@GetBusinessId() businessId: string, @Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(businessId, createAppointmentDto)
  }

  @ApiOperation({ summary: 'Busque um  agendamentos pelo seu id do usuário' })
  @ApiResponse({ status: 200, isArray: true })
  @ApiBearerAuth('access-token')
  @Get('user/:id')
  findByUserId(@GetBusinessId() businessId: string, @Param('id') id: string) {
    return this.appointmentService.findByUserId(id, businessId)
  }

  @ApiOperation({ summary: 'Edita status do agendamento' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  @Put(':id')
  updateStatus(@GetBusinessId() businessId: string, @Param('id') id: string, @Body() updateStatusAppointmentDto: UpdateStatusAppointmentDto) {
    return this.appointmentService.updateStatusAppointment(id, businessId, updateStatusAppointmentDto)
  }

  @ApiOperation({ summary: 'Cancele o agendamento' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  @Put('cancel/:id')
  cancelAppointment(@GetBusinessId() businessId: string, @Param('id') id: string, @Body() cancelAppointmentDto: CancelAppointmentDto) {
    return this.appointmentService.cancelAppointment(id, businessId, cancelAppointmentDto)
  }

  @ApiOperation({ summary: 'Deleta agendamento' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  @Delete(':id')
  delete(@GetBusinessId() businessId: string, @Param('id') id: string) {
    return this.appointmentService.delete(id, businessId)
  }
}