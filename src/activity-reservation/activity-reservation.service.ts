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

      return { activitityReservations };
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
      const { activity_id, from, date, to } = dto;

      const activityReservationFound = await this.isActivityReservationInDB(
        from,
        to,
        date,
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

  async isActivityReservationInDB(from: Date, to: Date, date: Date) {
    try {
      const activityResrvation =
        await this.prisma.activity_reservation.findMany({
          where: {
            date,
            from,
            to,
          },
        });

      return activityResrvation.length > 0;
    } catch (error) {}
  }
}
