import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CoachDto } from './dto';

@Injectable()
export class CoachService {
  constructor(private prisma: PrismaService) {}

  async getAllCoaches() {
    try {
      const coaches = await this.prisma.coach.findMany({
        include: {
          practices: { include: { sports: true } },
        },
      });

      if (!coaches) throw new HttpException('Error in database', 500);

      return { result: coaches };
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
      const coach = await this.prisma.coach.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          practices: { include: { sports: true } },
        },
      });

      if (!coach) throw new HttpException('Error in database', 500);

      return { result: coach };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addCoach(dto: CoachDto) {
    try {
      const { name } = dto;

      const newCoach = await this.prisma.coach.create({
        data: { name },
      });

      if (!newCoach) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newCoach };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateCoach(id: string, dto: CoachDto) {
    try {
      const { name } = dto;

      const updatedCoach = await this.prisma.coach.update({
        where: { id: Number(id) },
        data: { name },
      });

      if (!updatedCoach) throw new HttpException('Error in database', 500);

      return { msg: 'successfully updated', updatedCoach };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async deleteOne(id: string) {
    try {
      const coach = await this.prisma.coach.delete({
        where: {
          id: Number(id),
        },
      });

      if (!coach) throw new HttpException('Error in database', 500);

      return { msg: 'Coach deleted successfully' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
