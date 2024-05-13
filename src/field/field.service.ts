import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FieldDto } from './dto';

@Injectable()
export class FieldService {
  constructor(private prisma: PrismaService) {}

  async getAllFields() {
    try {
      const fields = await this.prisma.field.findMany({
        include: {
          activity: true,
        },
      });

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

  async getFieldById(fieldId: string) {
    try {
      const field = await this.prisma.field.findUnique({
        where: {
          id: Number(fieldId),
        },
        include: {
          activity: true,
        },
      });

      if (!field) throw new HttpException('Error in database', 500);

      return { result: field };
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

  async deleteFieldById(fieldId: string) {
    try {
      const field = await this.prisma.field.delete({
        where: {
          id: Number(fieldId),
        },
      });

      if (!field) throw new HttpException('Error in database', 500);

      return { msg: 'Field deleted successfully' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateFieldById(dto: FieldDto, fieldId: string) {
    try {
      const { name } = dto;

      const id = Number(fieldId);

      const updatedField = await this.prisma.field.update({
        where: { id },
        data: { name },
      });

      if (!updatedField) throw new HttpException('Error in database', 500);

      return { msg: 'Field updated successfully', updatedField };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
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
