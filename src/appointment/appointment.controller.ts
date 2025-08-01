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
    const filters = { doctorId, date, patientName };
    return this.appointmentService.findAll(filters, {
      limit: limitNumber,
      offset,
    });
  }

  @Get(':docId/:date')
  getSlots(@Param('docId') docId: string, @Param('date') date: string) {
    return this.appointmentService.fetchAllAvailableSlots(docId, date);
  }

  @Delete(':id')
  cancelAppoitment(@Param() id: string) {
    return this.appointmentService.cancelAppoimtment(id);
  }
}
