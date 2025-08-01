import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './model/appointment.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment) private appointmentModel: typeof Appointment,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { doctorId, startTime, endTime } = createAppointmentDto;
    const overlap = await this.appointmentModel.findOne({
      where: {
        doctorId,
        [Op.and]: [
          { startTime: { [Op.lt]: new Date(endTime) } },
          { endTime: { [Op.gt]: new Date(startTime) } },
        ],
      },
    });
    if (overlap) {
      throw new ConflictException(
        'Time slot is already book, please select another one.',
      );
    }
    return this.appointmentModel.create({ ...createAppointmentDto });
  }

  async findAll(
    filters = {},
    options: { limit?: number; offset?: number } = {},
  ): Promise<Appointment[]> {
    return this.appointmentModel.findAll({
      where: filters,
      limit: options.limit,
      offset: options.offset,
    });
  }

  async fetchAllAvailableSlots(docId: string, date: string) {
    const slots: string[] = [];
    const startHour = 9;
    const endHour = 17;
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const bookedAppointments = await this.appointmentModel.findAll({
      where: {
        docId,
        startTime: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    const bookedSlots = bookedAppointments.map((appt) => {
      const start = new Date(appt.startTime);
      return `${start.getHours()}:${start.getMinutes() === 0 ? '00' : '30'}`;
    });

    const availableSlots = slots.filter((slot) => !bookedSlots.includes(slot));

    return availableSlots;
  }

  async cancelAppoimtment(id: string) {
    const appoitment = await this.appointmentModel.findByPk(id);
    if (appoitment) {
      await appoitment.destroy();
    }
    return;
  }
}
