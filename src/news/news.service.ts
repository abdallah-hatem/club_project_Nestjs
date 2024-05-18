import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NewsDto, UpdateNewsDto } from './dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      const news = await this.prisma.news.findMany();

      if (!news) throw new HttpException('Error in database', 500);

      return { result: news };
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
      const news = await this.prisma.news.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!news) throw new HttpException('Error in database', 500);

      return { result: news };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addNews(dto: NewsDto) {
    try {
      const { date, description, imageUrl, title } = dto;

      const newNews = await this.prisma.news.create({
        data: { date, description, imageUrl, title },
      });

      if (!newNews) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newNews };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async deleteNews(id: string) {
    try {
      const news = await this.prisma.news.delete({
        where: {
          id: Number(id),
        },
      });

      if (!news) throw new HttpException('Error in database', 500);

      return { msg: 'news deleted successfully' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateNews(dto: UpdateNewsDto, id: string) {
    try {
      const { date, description, imageUrl, title } = dto;

      const news = await this.prisma.news.update({
        where: {
          id: Number(id),
        },
        data: { date, description, imageUrl, title },
      });

      if (!news) throw new HttpException('Error in database', 500);

      return { msg: 'successfully updated', news };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
