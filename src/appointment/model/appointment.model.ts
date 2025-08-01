import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Doctor } from 'src/doctor/model/doctor.model';

@Table
export class Appointment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  patientName: string;

  @Column
  startTime: Date;

  @Column
  endTime: Date;

  @ForeignKey(() => Doctor)
  @Column
  doctorId: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;
}
