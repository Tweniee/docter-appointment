import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Appointment } from 'src/appointment/model/appointment.model';

@Table
export class Doctor extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  name: string;

  @Column
  specialization: string;

  @HasMany(() => Appointment)
  appointments: Appointment[];
}
