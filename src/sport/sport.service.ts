import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SportDto } from './dto';

@Injectable()
export class SportService {
  constructor(private prisma: PrismaService) {}

  async getAllSports() {
    try {
      const sports = await this.prisma.sport.findMany({
        include: {
          practices: {
            include: { coach: true },
          },
        },
      });

      if (!sports) throw new HttpException('Error in database', 500);

      return { result: sports };
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
      const sport = await this.prisma.sport.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          practices: {
            include: { coach: true },
          },
        },
      });

      if (!sport) throw new HttpException('Error in database', 500);

      return { result: sport };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addSport(dto: SportDto) {
    try {
      const { name } = dto;

      const newSport = await this.prisma.sport.create({
        data: { name },
      });

      if (!newSport) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newSport };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateSport(id: string, dto: SportDto) {
    try {
      const { name } = dto;
      const sport = await this.prisma.sport.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });
      if (!sport) throw new HttpException('Error in database', 500);
      return { msg: 'successfully updated', sport };
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
      const sport = await this.prisma.sport.delete({
        where: {
          id: Number(id),
        },
      });
      if (!sport) throw new HttpException('Error in database', 500);
      return { msg: 'successfully deleted', sport };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
