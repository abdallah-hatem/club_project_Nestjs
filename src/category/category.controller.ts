import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Post()
  addCategory(@Body() dto: CategoryDto) {
    return this.categoryService.addCategory(dto);
  }

  @Delete('/:id')
  deleteCategoryById(@Param('id') id: string) {
    return this.categoryService.deleteCategoryById(id);
  }

  @Put('/:id')
  updateCategoryById(@Body() dto: CategoryDto, @Param('id') id: string) {
    return this.categoryService.updateCategoryById(dto, id);
  }
}
