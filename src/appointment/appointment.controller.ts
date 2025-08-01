import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Op } from 'sequelize';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll(
    @Query('doctorId') doctorId?: string,
    @Query('date') date?: string,
    @Query('patientName') patientName?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;
    const filters: any = {};
    if (date) {
      filters.startTime = date;
    }
    if (doctorId) {
      filters.doctorId = doctorId;
    }

    if (patientName) {
      filters.patientName = patientName;
    }
    return this.appointmentService.findAll(filters, {
      limit: limitNumber,
      offset,
    });
  }

  @Get('slots/:docId/:startTime')
  getSlots(@Param('docId') id: string, @Param('startTime') startTime: string) {
    return this.appointmentService.fetchAllAvailableSlots(id, startTime);
  }

  @Delete(':id')
  cancelAppoitment(@Param() id: string) {
    return this.appointmentService.cancelAppoimtment(id);
  }
}
