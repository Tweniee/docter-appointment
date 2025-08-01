import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  DataType,
  AllowNull,
} from 'sequelize-typescript';
import { Appointment } from 'src/appointment/model/appointment.model';

@Table
export class Doctor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare specialization: string;

  @HasMany(() => Appointment)
  appointments: Appointment[];
}
