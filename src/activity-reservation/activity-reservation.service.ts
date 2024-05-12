import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityReservationDto } from './dto';

@Injectable()
export class ActivityReservationService {
  constructor(private prisma: PrismaService) {}

  async getAllReservations() {
    try {
      const activitityReservations =
        await this.prisma.activity_reservation.findMany();

      if (!activitityReservations)
        throw new HttpException('Error in database', 500);

      return { result: activitityReservations };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addActivityReservation(dto: ActivityReservationDto) {
    try {
      const { activity_id, from, date, to, field_id, user_id } = dto;

      const reservations = await this.prisma.activity_reservation.findMany();

      const timeAlreadyFound = this.isTimeRangeAvailable(
        reservations.map((el) => {
          return {
            from: el.from,
            to: el.to,
          };
        }),
        from,
        to,
      );

      if (timeAlreadyFound)
        throw new HttpException('ActivityResrvation already in database', 409);

      const activityReservationFound = await this.isActivityReservationInDB(
        from,
        to,
        date,
        field_id,
      );

      if (activityReservationFound)
        throw new HttpException('ActivityResrvation already in database', 409);

      const newActivityReservation =
        await this.prisma.activity_reservation.create({
          data: {
            activity_id,
            from,
            date,
            to,
            field_id,
            user_id,
          },
        });

      if (!newActivityReservation)
        throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newActivityReservation };
    } catch (error) {
      if (error) {
        console.log(error);

        const { message, status } = error;
        throw new HttpException(message, status);
      }
      return error;
    }
  }

  // helpers

  async isActivityReservationInDB(
    from: Date,
    to: Date,
    date: Date,
    field_id?: number,
  ) {
    try {
      const activityResrvation =
        await this.prisma.activity_reservation.findMany({
          where: {
            date,
            from,
            to,
            field_id,
          },
        });

      return activityResrvation.length > 0;
    } catch (error) {}
  }

  isTimeRangeAvailable(reservedSlots: any[], fromTime: Date, toTime: Date) {
    const from = new Date(fromTime).getTime();
    const to = new Date(toTime).getTime();

    // Check if the provided time range overlaps with any reserved slots
    for (const slot of reservedSlots) {
      const slotFrom = new Date(slot.from).getTime();
      const slotTo = new Date(slot.to).getTime();

      if (!(to <= slotFrom || from >= slotTo)) {
        // Time range overlaps with this reserved slot
        return false; // Not available
      }
    }

    // Time range does not overlap with any reserved slots
    return true; // Available
  }
}
