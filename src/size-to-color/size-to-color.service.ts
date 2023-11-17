import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  SizeToColorsDto,
  SizeToColorsUpdateDto,
} from './dto/size-to-colors.dto';

@Injectable()
export class SizeToColorService {
  constructor(private prisma: PrismaService) {}

  async getAllSizeToColors() {
    try {
      const sizeToColors = await this.prisma.sizeToColors.findMany({
        include: { colors: true, size: true },
      });
      if (!sizeToColors) {
        throw new BadRequestException().getResponse();
      }

      return { sizeToColors };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addSizeToColors(dto: SizeToColorsDto) {
    try {
      const { productId, sizeId, colors, quantity } = dto;

      // check if sizeToColor already exists

      const alreadyExists = await this.canAdd(productId, sizeId, colors);

      if (alreadyExists) {
        throw new BadRequestException(
          'Error! item already found',
        ).getResponse();
      }

      const newSizeToColors = await this.prisma.sizeToColors.create({
        data: {
          productId,
          sizeId,
          quantity,
          colors: {
            connect: colors.map((id: number) => ({ id })),
          },
        },
      });

      if (!newSizeToColors) throw new BadRequestException().getResponse();

      return { msg: 'Succefully created', newSizeToColors };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateSizeToColors(dto: SizeToColorsUpdateDto, id: string) {
    try {
      const sizeToColorId = Number(id);
      const { colors, quantity, productId, sizeId } = dto;

      // check if eligible to update
      const alreadyExists = await this.canUpdate(
        productId,
        sizeId,
        colors,
        sizeToColorId,
      );

      if (alreadyExists) {
        throw new BadRequestException(
          'Error! size with the same colors already exists',
        ).getResponse();
      }

      // TODO check if all colors ar in database before creating

      const updatedSizeToColors = await this.prisma.sizeToColors.update({
        where: { id: sizeToColorId },
        data: {
          colors: { set: colors?.map((id: number) => ({ id })) },
          quantity,
        },
      });

      if (!updatedSizeToColors) {
        throw new BadRequestException().getResponse();
      }

      return { msg: 'successfully updated', updatedSizeToColors };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async getStcByProductId(productId: number) {
    try {
      const sizeToColors = await this.prisma.sizeToColors.findMany({
        where: { productId },
        include: { colors: true, size: true },
      });
      if (!sizeToColors) {
        throw new BadRequestException().getResponse();
      }

      return { sizeToColors };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async deleteSizeToColors(stcId: string) {
    try {
      const id = Number(stcId);
      const deletedStc = await this.prisma.sizeToColors.delete({
        where: { id },
      });

      if (!deletedStc) throw new HttpException('Error! could not delete', 400);

      return { msg: 'successfully deleted' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  /////////////////////////////////////////////
  async findSizeToColor(id: number) {
    console.log(id);

    try {
      const alreadyExists = await this.prisma.sizeToColors.findUnique({
        where: { id },
      });
      if (!alreadyExists) throw new HttpException('Error!', 400);

      return alreadyExists;
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async canAdd(productId: number, sizeId: number, colors: number[]) {
    try {
      const alreadyExists = await this.prisma.sizeToColors.findMany({
        where: { productId, sizeId, colors: { some: { id: { in: colors } } } },
      });
      if (!alreadyExists) throw new HttpException('Error!', 400);

      console.log(alreadyExists);

      return alreadyExists.length > 0;
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async canUpdate(
    productId: number,
    sizeId: number,
    colors: number[],
    sizeToColorId: number,
  ) {
    try {
      const alreadyExists = await this.prisma.sizeToColors.findMany({
        where: {
          NOT: { id: sizeToColorId },
          productId,
          sizeId,
          colors: { every: { id: { in: colors } } },
        },
      });
      if (!alreadyExists) throw new HttpException('Error!', 400);

      console.log(alreadyExists);

      return alreadyExists.length > 0;
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
