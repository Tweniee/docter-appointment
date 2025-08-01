import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Doctor } from 'src/doctor/model/doctor.model';
import { Appointment } from './model/appointment.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Appointment, Doctor])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
