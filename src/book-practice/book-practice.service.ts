import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookPracticeDto } from './dto';

@Injectable()
export class BookPracticeService {
  constructor(private prisma: PrismaService) {}

  async getAllBookedPractices() {
    try {
      const bookedPractices = await this.prisma.user_practices.findMany({
        include: {
          practice_schedule: {
            include: {
              coach: true,
              sports: true,
            },
          },
        },
      });

      if (!bookedPractices) throw new HttpException('Error in database', 500);

      return { result: bookedPractices };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async getBookPracticeByUserId(id: string) {
    try {
      const bookedPractice = await this.prisma.user_practices.findMany({
        where: {
          user_id: Number(id),
        },
        include: {
          practice_schedule: {
            include: {
              coach: true,
              sports: true,
            },
          },
        },
      });

      if (!bookedPractice) throw new HttpException('Error in database', 500);

      return { result: bookedPractice };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addBookPractice(dto: BookPracticeDto) {
    try {
      const { user_id, practice_id } = dto;

      const userPractices = await this.prisma.user_practices.findMany({
        where: {
          user_id,
          practice_id,
        },
      });

      if (userPractices.length > 0) {
        throw new HttpException('User already has this practice', 400);
      }

      const bookedPractice = await this.prisma.user_practices.create({
        data: {
          user_id,
          practice_id,
        },
      });

      if (!bookedPractice) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', result: bookedPractice };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
