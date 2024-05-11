import {
  Controller,
  Get,
  // Body,
  // Delete,
  // Param,
  // Post,
  // Put,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
// import { ActivityDto } from './dto';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  getAllActivities() {
    return this.activityService.getAllActivities();
  }

  // @Post()
  // addCategory(@Body() dto: ActivityDto) {
  //   return this.categoryService.addCategory(dto);
  // }

  // @Delete('/:id')
  // deleteCategoryById(@Param('id') id: string) {
  //   return this.categoryService.deleteCategoryById(id);
  // }

  // @Put('/:id')
  // updateCategoryById(@Body() dto: ActivityDto, @Param('id') id: string) {
  //   return this.categoryService.updateCategoryById(dto, id);
  // }
}
