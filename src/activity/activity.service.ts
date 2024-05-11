import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { ActivityDto } from './dto';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async getAllActivities() {
    try {
      const activities = await this.prisma.activity.findMany();

      if (!activities) throw new HttpException('Error in database', 500);

      return { activities };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  // async addCategory(dto: ActivityDto) {
  //   try {
  //     const { name } = dto;

  //     const categoryFound = await this.isCategoryInDB(name);

  //     if (categoryFound)
  //       throw new HttpException('Category already in database', 409);

  //     const newCategory = await this.prisma.category.create({
  //       data: {
  //         name,
  //       },
  //     });

  //     if (!newCategory) throw new HttpException('Error in database', 500);

  //     return { msg: 'successfully created', newCategory };
  //   } catch (error) {
  //     if (error) {
  //       console.log(error);

  //       const { message, status } = error;
  //       throw new HttpException(message, status);
  //     }
  //     return error;
  //   }
  // }

  // async deleteCategoryById(categoryId: string) {
  //   try {
  //     const id = Number(categoryId);
  //     const deletedCategory = await this.prisma.category.delete({
  //       where: { id },
  //     });

  //     if (!deletedCategory) throw new HttpException('Error in database', 500);

  //     return { msg: 'Category deleted successfully' };
  //   } catch (error) {
  //     if (error) {
  //       const { message, statusCode } = error;
  //       throw new HttpException(message, statusCode);
  //     }
  //     return error;
  //   }
  // }

  // async updateCategoryById(dto: ActivityDto, categoryId: string) {
  //   try {
  //     const { name } = dto;
  //     const id = Number(categoryId);

  //     const updatedCategory = await this.prisma.category.update({
  //       where: { id },
  //       data: { name },
  //     });

  //     if (!updatedCategory) throw new HttpException('Error in database', 500);

  //     return { msg: 'Category updated successfully', updatedCategory };
  //   } catch (error) {
  //     if (error) {
  //       const { message, statusCode } = error;
  //       throw new HttpException(message, statusCode);
  //     }
  //     return error;
  //   }
  // }

  // async isCategoryInDB(name: string) {
  //   try {
  //     const category = await this.prisma.category.findMany({
  //       where: {
  //         name,
  //       },
  //     });

  //     return category.length > 0;
  //   } catch (error) {}
  // }
}
