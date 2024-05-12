import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FieldDto } from './dto';

@Injectable()
export class FieldService {
  constructor(private prisma: PrismaService) {}

  async getAllFields() {
    try {
      const fields = await this.prisma.field.findMany();

      if (!fields) throw new HttpException('Error in database', 500);

      return { result: fields };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addField(dto: FieldDto) {
    try {
      const { activity_id, name } = dto;

      const activityReservationFound = await this.isFieldInDB(
        name,
        activity_id,
      );

      if (activityReservationFound)
        throw new HttpException('ActivityResrvation already in database', 409);

      const newField = await this.prisma.field.create({
        data: { activity_id, name },
      });

      if (!newField) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newField };
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
  async isFieldInDB(name: string, activity_id: number) {
    try {
      const activityResrvation = await this.prisma.field.findMany({
        where: {
          name,
          activity_id,
        },
      });

      return activityResrvation.length > 0;
    } catch (error) {}
  }
}
