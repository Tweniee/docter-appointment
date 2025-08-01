import {
  IsString,
  IsInt,
  IsDateString,
  IsNotEmpty,
  Min,
  Length,
  Validate,
} from 'class-validator';
import { IsFullIsoDateTimeString } from '../validation/is-full-iso-datetime.validator';

export class CreateAppointmentDto {
  @IsInt()
  @Min(1, { message: 'Doctor ID must be a positive integer' })
  doctorId: number;

  @IsString()
  @IsNotEmpty({ message: 'Patient name is required' })
  @Length(2, 100, {
    message: 'Patient name must be between 2 and 100 characters',
  })
  patientName: string;

  @IsNotEmpty({ message: 'Start time is required' })
  @Validate(IsFullIsoDateTimeString, {
    message:
      'Start time must include date and time (e.g., 2025-08-01T10:00:00)',
  })
  startTime: string;

  @IsNotEmpty({ message: 'End time is required' })
  @Validate(IsFullIsoDateTimeString, {
    message: 'End time must include date and time (e.g., 2025-08-01T11:00:00)',
  })
  endTime: string;
}
