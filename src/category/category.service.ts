import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    try {
      const categories = await this.prisma.category.findMany();

      if (!categories) return { msg: 'Error!' };

      return { categories };
    } catch (error) {
      console.log({ error });
      return { error };
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

      if (!newCategory) throw new Error('error');

      return { msg: 'successfully created', newCategory };
    } catch (error) {
      console.log(error);

      return { error };
    }
  }

  async deleteCategoryById(categoryId: string) {
    try {
      const id = Number(categoryId);
      const deletedCategory = await this.prisma.category.delete({
        where: { id },
      });

      if (!deletedCategory) throw new Error('Error!');

      return { msg: 'Category deleted successfully' };
    } catch (error) {
      console.log({ error });
      return { error };
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

      if (!updatedCategory) throw new Error('Error!');

      return { msg: 'Category updated successfully', updatedCategory };
    } catch (error) {
      console.log({ error });
      return { error };
    }
  }
}
