import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactUsDto, UpdateContactUsDto } from './dto';

@Injectable()
export class ContactUsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      const activities = await this.prisma.contact_us.findMany();

      if (!activities) throw new HttpException('Error in database', 500);

      if (activities.length === 0) {
        this.addContactUS({
          description: 'description',
          email: 'email',
          phone_number: 'phone_number',
        });
      }

      return { result: activities };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addContactUS(dto: ContactUsDto) {
    try {
      const { description, email, phone_number } = dto;

      const contactUs = await this.prisma.contact_us.create({
        data: {
          description,
          email,
          phone_number,
        },
      });

      if (!contactUs) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', result: contactUs };
    } catch (error) {
      if (error) {
        console.log(error);

        const { message, status } = error;
        throw new HttpException(message, status);
      }
      return error;
    }
  }

  async updateContactUS(dto: UpdateContactUsDto, id: string) {
    try {
      const { description, email, phone_number } = dto;

      const updatedContactUs = await this.prisma.contact_us.update({
        where: {
          id: Number(id),
        },
        data: {
          description,
          email,
          phone_number,
        },
      });

      if (!updatedContactUs) throw new HttpException('Error in database', 500);

      return { msg: 'successfully updated', result: updatedContactUs };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
