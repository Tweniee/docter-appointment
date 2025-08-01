import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  DataType,
  AllowNull,
} from 'sequelize-typescript';
import { Doctor } from 'src/doctor/model/doctor.model';

@Table
export class Appointment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare patientName: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare startTime: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare endTime: Date;

  @ForeignKey(() => Doctor)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare doctorId: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;
}
