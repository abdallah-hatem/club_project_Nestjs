import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PracticeDto, UpdatePracticeDto } from './dto';

@Injectable()
export class PracticeService {
  constructor(private prisma: PrismaService) {}

  async getAllPractices() {
    try {
      const practices = await this.prisma.practice_schedule.findMany({
        include: {
          coach: true,
          sports: true,
        },
      });

      if (!practices) throw new HttpException('Error in database', 500);

      return { result: practices };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async getPracticeById(practiceId: string) {
    try {
      const practice = await this.prisma.practice_schedule.findUnique({
        where: {
          id: Number(practiceId),
        },
      });

      if (!practice) throw new HttpException('Error in database', 500);

      return { result: practice };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  // async getPracticesByCoachId(coachId: string) {
  //   try {
  //     const practices = await this.prisma.practice_schedule.findMany({
  //       where: {
  //         coach_id: Number(coachId),
  //       },
  //     });

  //     if (!practices) throw new HttpException('Error in database', 500);

  //     return { result: practices };
  //   } catch (error) {
  //     if (error) {
  //       const { message, statusCode } = error;
  //       throw new HttpException(message, statusCode);
  //     }
  //     return error;
  //   }
  // }

  // async getPracticesByUserId(userId: string) {
  //   try {
  //     const practices = await this.prisma.practice_schedule.findMany({
  //       where: {
  //         user_id: Number(userId),
  //       },
  //     });

  //     if (!practices) throw new HttpException('Error in database', 500);

  //     return { result: practices };
  //   } catch (error) {
  //     if (error) {
  //       const { message, statusCode } = error;
  //       throw new HttpException(message, statusCode);
  //     }
  //     return error;
  //   }
  // }

  async addPractice(dto: PracticeDto) {
    try {
      const { coach_id, from, to, price, days, sport_id, deadline } = dto;

      //   check if user already has a practice

      const practices = await this.prisma.practice_schedule.findMany({
        where: {
          coach_id,
          from,
          to,
          price: String(price),
          days,
          sport_id,
          deadline,
        },
      });

      if (practices.length > 0) throw new HttpException('already found', 400);

      const practice = await this.prisma.practice_schedule.create({
        data: {
          coach_id,
          from,
          to,
          price: String(price),
          days,
          sport_id,
          deadline,
        },
      });

      if (!practice) throw new HttpException('Error in database', 500);

      return { result: practice };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async deletePracticeById(practiceId: string) {
    try {
      const practice = await this.prisma.practice_schedule.delete({
        where: {
          id: Number(practiceId),
        },
      });

      if (!practice) throw new HttpException('Error in database', 500);

      return { result: practice };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updatePracticeById(dto: UpdatePracticeDto, practiceId: string) {
    try {
      const { coach_id, from, to, price, days, sport_id } = dto;

      const practice = await this.prisma.practice_schedule.update({
        where: {
          id: Number(practiceId),
        },
        data: {
          coach_id,
          from,
          to,
          price: String(price),
          days,
          sport_id,
        },
      });

      if (!practice) throw new HttpException('Error in database', 500);

      return { result: practice };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
