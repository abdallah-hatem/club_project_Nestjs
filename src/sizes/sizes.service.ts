import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SizeDto } from './dto';

@Injectable()
export class SizesService {
  constructor(private prisma: PrismaService) {}

  async getAllSizes() {
    try {
      const sizes = await this.prisma.sizes.findMany();

      if (!sizes) throw new HttpException('Error in database', 500);

      return { sizes };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addSize(dto: SizeDto) {
    try {
      const { name } = dto;

      const sizeFound = await this.isSizeInDB(name);

      if (sizeFound) throw new HttpException('Size already in database', 409);

      const newSize = await this.prisma.sizes.create({
        data: {
          name,
        },
      });

      if (!newSize) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newSize };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
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

      if (!deletedSize) throw new HttpException('Error in database', 500);

      return { msg: 'successfully deleted', deletedSize };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateSizeById(dto: SizeDto, sizeId: string) {
    try {
      const { name } = dto;
      const id = Number(sizeId);

      const updatedSize = await this.prisma.sizes.update({
        where: { id },
        data: { name },
      });

      if (!updatedSize) throw new HttpException('Error in database', 500);

      return { msg: 'Size updated successfully', updatedSize };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async isSizeInDB(name: string) {
    try {
      const size = await this.prisma.sizes.findMany({
        where: {
          name,
        },
      });

      return size.length > 0;
    } catch (error) {
      return { error };
    }
  }
}
