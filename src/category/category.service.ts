import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    try {
      const categories = await this.prisma.category.findMany();

      if (!categories) throw new HttpException('Error in database', 500);

      return { categories };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addCategory(dto: CategoryDto) {
    try {
      const { name } = dto;

      const newCategory = await this.prisma.category.create({
        data: {
          name,
        },
      });

      if (!newCategory) throw new HttpException('Error in database', 500);

      return { msg: 'successfully created', newCategory };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async deleteCategoryById(categoryId: string) {
    try {
      const id = Number(categoryId);
      const deletedCategory = await this.prisma.category.delete({
        where: { id },
      });

      if (!deletedCategory) throw new HttpException('Error in database', 500);

      return { msg: 'Category deleted successfully' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateCategoryById(dto: CategoryDto, categoryId: string) {
    try {
      const { name } = dto;
      const id = Number(categoryId);

      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: { name },
      });

      if (!updatedCategory) throw new HttpException('Error in database', 500);

      return { msg: 'Category updated successfully', updatedCategory };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
