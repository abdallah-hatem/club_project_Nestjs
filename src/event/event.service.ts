import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      const events = await this.prisma.event.findMany();

      if (!events) throw new HttpException('Error in database', 500);

      return { result: events };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async getOne(id: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!event) throw new HttpException('Error in database', 500);

      return { result: event };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addEvent(dto: EventDto) {
    try {
      const { date, description, imageUrl, title } = dto;

      const newEvent = await this.prisma.event.create({
        data: { date, description, imageUrl, title },
      });

      if (!newEvent) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newEvent };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async deleteEvent(id: string) {
    try {
      const event = await this.prisma.event.delete({
        where: {
          id: Number(id),
        },
      });

      if (!event) throw new HttpException('Error in database', 500);

      return { msg: 'Event deleted successfully' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateEvent(dto: UpdateEventDto, id: string) {
    try {
      const { date, description, imageUrl, title } = dto;

      const event = await this.prisma.event.update({
        where: {
          id: Number(id),
        },
        data: { date, description, imageUrl, title },
      });

      if (!event) throw new HttpException('Error in database', 500);

      return { msg: 'successfully updated', event };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
