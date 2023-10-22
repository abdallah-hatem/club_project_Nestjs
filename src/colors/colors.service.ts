import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ColorDto } from './dto';

@Injectable()
export class ColorsService {
  constructor(private prisma: PrismaService) {}

  async getAllColors() {
    try {
      const colors = await this.prisma.colors.findMany();

      if (!colors) return { msg: 'Error!' };

      return { colors };
    } catch (error) {
      console.log({ error });
      return { error };
    }
  }

  async addColor(dto: ColorDto) {
    try {
      const { name, hex } = dto;

      const newColor = await this.prisma.colors.create({
        data: {
          name,
          hex,
        },
      });

      if (!newColor) throw new Error('error');

      return { msg: 'successfully created', newColor };
    } catch (error) {
      console.log(error);

      return { error };
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

      if (!deletedColor) throw new Error('error');

      return { msg: 'successfully deleted' };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}
