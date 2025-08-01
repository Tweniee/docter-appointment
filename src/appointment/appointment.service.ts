import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
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
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();

    const allowedStartHour = 9;
    const allowedEndHour = 17;

    const startHour = start.getUTCHours();
    const endHour = end.getUTCHours();

    if (start < now) {
      throw new BadRequestException('Cannot book an appointment in the past.');
    }

    if (
      startHour < allowedStartHour ||
      endHour > allowedEndHour ||
      start >= end
    ) {
      throw new BadRequestException(
        'Appointments can only be booked between 9:00 AM and 5:00 PM UTC.',
      );
    }

    const diffInMs = end.getTime() - start.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);

    if (diffInMinutes !== 30) {
      throw new BadRequestException(
        'Appointments must be exactly 30 minutes long.',
      );
    }
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

  async fetchAllAvailableSlots(
    doctorId: string,
    date: string,
  ): Promise<string[]> {
    const availableSlots: string[] = [];
    const startHour = 9;
    const endHour = 17;

    // Generate 30-minute slot times in UTC
    for (let hour = startHour; hour < endHour; hour++) {
      availableSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      availableSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }

    // Start and end of the day in UTC
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Get booked slots
    const bookedAppointments = await this.appointmentModel.findAll({
      where: {
        doctorId,
        startTime: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    const bookedSlots = bookedAppointments.map((appt) => {
      const start = new Date(appt.startTime);
      const hour = start.getUTCHours();
      const minutes = start.getUTCMinutes();
      return `${hour.toString().padStart(2, '0')}:${minutes === 0 ? '00' : '30'}`;
    });

    // Filter out booked slots
    const available = availableSlots.filter(
      (slot) => !bookedSlots.includes(slot),
    );

    return available;
  }
  async cancelAppoimtment({ id }: any) {
    console.log(id);
    const appoitment = await this.appointmentModel.findByPk(id);
    if (appoitment) {
      await appoitment.destroy();
    }
    return "Success";
  }
}
