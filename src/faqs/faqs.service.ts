import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FaqsDto, UpdateFaqsDto } from './dto';

@Injectable()
export class FaqsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      const faqs = await this.prisma.faqs.findMany();

      if (!faqs) throw new HttpException('Error in database', 500);

      return { result: faqs };
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
      const faqs = await this.prisma.faqs.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!faqs) throw new HttpException('Error in database', 500);

      return { result: faqs };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addFaq(dto: FaqsDto) {
    try {
      const { question, answer } = dto;

      const faqs = await this.prisma.faqs.create({
        data: {
          question,
          answer,
        },
      });

      if (!faqs) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', result: faqs };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateFaq(dto: UpdateFaqsDto, id: string) {
    try {
      const { question, answer } = dto;

      const faqs = await this.prisma.faqs.update({
        where: {
          id: Number(id),
        },
        data: {
          question,
          answer,
        },
      });

      if (!faqs) throw new HttpException('Error in database', 500);

      return { msg: 'successfully updated', result: faqs };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async deleteFaq(id: string) {
    try {
      const faqs = await this.prisma.faqs.delete({
        where: {
          id: Number(id),
        },
      });

      if (!faqs) throw new HttpException('Error in database', 500);

      return { msg: 'Faq deleted successfully' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
