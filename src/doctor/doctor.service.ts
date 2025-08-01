import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './model/doctor.model';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor) private doctorModel: typeof Doctor) {}
  create(createDoctorDto: CreateDoctorDto) {
    //with no primary field we cannot multiple doctors can create profile in doctor table
    return this.doctorModel.create({ createDoctorDto });
  }

  async findAll(
    filters = {},
    options: { limit?: number; offset?: number } = {},
  ): Promise<Doctor[]> {
    return this.doctorModel.findAll({
      where: filters,
      limit: options.limit,
      offset: options.offset,
    });
  } 
}
