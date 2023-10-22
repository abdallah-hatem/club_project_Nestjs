import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SizeDto } from './dto';

@Injectable()
export class SizesService {
  constructor(private prisma: PrismaService) {}

  async getAllSizes() {
    try {
      const sizes = await this.prisma.sizes.findMany();

      if (!sizes) return { msg: 'Error!' };

      return { sizes };
    } catch (error) {
      console.log({ error });
      return { error };
    }
  }

  async addSize(dto: SizeDto) {
    try {
      const { name } = dto;

      const newSize = await this.prisma.sizes.create({
        data: {
          name,
        },
      });

      if (!newSize) throw new Error('error');

      return { msg: 'successfully created', newSize };
    } catch (error) {
      console.log(error);

      return { error };
    }
  }

  async deleteSizeById(dto: string) {
    try {
      const id = Number(dto);
      const deletedSize = await this.prisma.sizes.delete({
        where: {
          id,
        },
      });

      if (!deletedSize) throw new Error('error');

      return { msg: 'successfully deleted', deletedSize };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
}
