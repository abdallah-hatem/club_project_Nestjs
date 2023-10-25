import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ColorDto, ColorUpdateDto } from './dto';

@Injectable()
export class ColorsService {
  constructor(private prisma: PrismaService) {}

  async getAllColors() {
    try {
      const colors = await this.prisma.colors.findMany();

      if (!colors) throw new HttpException('Error in database', 500);

      return { colors };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addColor(dto: ColorDto) {
    try {
      const { name, hex } = dto;

      const colorFound = await this.isColorInDB(name);

      if (colorFound) throw new HttpException('Color already in database', 409);

      const newColor = await this.prisma.colors.create({
        data: {
          name,
          hex,
        },
      });

      if (!newColor) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newColor };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async deleteColorById(dto: string) {
    try {
      const id = Number(dto);
      const deletedColor = await this.prisma.colors.delete({
        where: {
          id,
        },
      });

      if (!deletedColor) throw new HttpException('Error in database', 500);

      return { msg: 'successfully deleted' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateColorById(dto: ColorUpdateDto, colorId: string) {
    try {
      const { name, hex } = dto;
      const id = Number(colorId);

      const updatedColor = await this.prisma.colors.update({
        where: { id },
        data: { name, hex },
      });

      if (!updatedColor) throw new HttpException('Error in database', 500);

      return { msg: 'Color updated successfully', updatedColor };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async isColorInDB(name: string) {
    try {
      const colors = await this.prisma.colors.findMany({
        where: {
          name,
        },
      });

      return colors.length > 0;
    } catch (error) {
      return { error };
    }
  }
}
