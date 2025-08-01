import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  doctorId: number;

  @IsString()
  patientName: string;

  @IsDateString()
  startTime: string;  // ISO datetime

  @IsDateString()
  endTime: string;
}
