import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  findAll(
    @Query('specialization') specialization?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('id') id?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;

    const filters: any = {};
    if (specialization) filters.specialization = specialization;
    if (id) filters.id = id;

    return this.doctorService.findAll(filters, {
      limit: limitNumber,
      offset,
    });
  }
}
