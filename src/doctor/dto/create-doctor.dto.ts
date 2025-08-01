import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty({ message: 'Doctor name is required' })
  @IsString({ message: 'Doctor name must be a string' })
  @Length(2, 100, { message: 'Doctor name must be between 2 and 100 characters' })
  name: string;

  @IsNotEmpty({ message: 'Specialization is required' })
  @IsString({ message: 'Specialization must be a string' })
  @Length(2, 100, { message: 'Specialization must be between 2 and 100 characters' })
  specialization: string;
}
