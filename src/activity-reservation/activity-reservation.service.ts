import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActivityReservationDto, ReservedDataDto } from './dto';

@Injectable()
export class ActivityReservationService {
  constructor(private prisma: PrismaService) {}

  async getAllReservations() {
    try {
      const activitityReservations =
        await this.prisma.activity_reservation.findMany({
          include: { activity: true, fields: true },
        });

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
      const { activity_id, date, field_id, user_id, selectedTimes } = dto;

      // get field ids for the activity
      const fields = await this.prisma.field.findMany({
        where: { activity_id },
      });

      const field_ids = fields.map((el) => el.id);

      if (!field_ids.includes(field_id))
        throw new HttpException('Field not found', 404);

      // get reservations with the same field and same activity
      const reservationsOnSameField =
        await this.prisma.activity_reservation.findMany({
          where: { field_id, activity_id },
        });

      console.log(reservationsOnSameField, 'reservationsOnSameField');

      // get reservations with the same date
      const reservationsWithSameDay = reservationsOnSameField.filter(
        (el) => el.date.getDay() === new Date(date).getDay(),
      );

      console.log(reservationsWithSameDay, 'reservationsWithSameDay');

      // Check if the provided time range overlaps with any reserved time ranges
      // const isTimeAvailable = this.isTimeRangeAvailable(
      //   reservationsWithSameDay.map((el) => {
      //     return {
      //       from: el.from,
      //       to: el.to,
      //     };
      //   }),
      //   from,
      //   to,
      // );

      // if (!isTimeAvailable)
      //   throw new HttpException('ActivityResrvation already in database', 409);

      // const activityReservationFound = await this.isActivityReservationInDB(
      //   from,
      //   to,
      //   date,
      //   field_id,
      //   user_id,
      // );

      // if (activityReservationFound)
      //   throw new HttpException('ActivityResrvation already in database', 409);

      const newActivityReservation =
        await this.prisma.activity_reservation.create({
          data: {
            activity_id,
            date,
            field_id,
            user_id,
            selectedTimes,
          },
        });

      if (!newActivityReservation)
        throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', result: newActivityReservation };
    } catch (error) {
      if (error) {
        console.log(error);

        const { message, status } = error;
        throw new HttpException(message, status);
      }
      return error;
    }
  }

  async getReservedTimes(dto: ReservedDataDto) {
    try {
      const { activity_id, field_id, date } = dto;

      // get reservations with the same field and same activity
      const bookedTimes = await this.prisma.activity_reservation.findMany({
        where: { field_id, activity_id, date },
      });

      console.log(bookedTimes, 'bookedTimes');

      const selectedTimesArray = bookedTimes.map((el) => {
        return el.selectedTimes.split(',');
      });

      console.log(selectedTimesArray, 'selectedTimesArray');

      // const formatTimes = bookedTimes.map((el) => {
      //   return {
      //     from: this.getTimeFormat(el.from),
      //     to: this.getTimeFormat(el.to),
      //   };
      // });

      // console.log(formatTimes, 'formatTimes');

      // const formatBookedTimes = bookedTimes.map((el) => {
      //   return {
      //     ...el,
      //     from_format: this.getTimeFormat(el.from),
      //     to_format: this.getTimeFormat(el.to),
      //   };
      // });

      // if (!bookedTimes) throw new HttpException('Error in database', 500);

      return { result: selectedTimesArray[0] };
    } catch (error) {}
  }

  // helpers
  async isActivityReservationInDB(
    from: Date,
    to: Date,
    date: Date,
    field_id?: number,
    user_id?: number,
    selectedTimes?: string,
  ) {
    try {
      const activityResrvation =
        await this.prisma.activity_reservation.findMany({
          where: {
            date,
            field_id,
            user_id,
            selectedTimes,
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
      const slotFrom = slot.from.getTime();
      const slotTo = slot.to.getTime();

      if (!(to <= slotFrom || from >= slotTo)) {
        // Time range overlaps with this reserved slot
        return false; // Not available
      }
    }

    // Time range does not overlap with any reserved slots
    return true; // Available
  }

  getTimeFormat = (dateTimeString: Date) => {
    const date = dateTimeString;
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12;

    // Add leading zeros to minutes if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Determine if it's AM or PM
    const period = hours < 12 ? 'AM' : 'PM';

    return `${hours12}:${formattedMinutes} ${period}`;
  };
}
