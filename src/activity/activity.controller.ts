import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityDto } from './dto';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  getAllActivities() {
    return this.activityService.getAllActivities();
  }

  @Post()
  addCategory(@Body() dto: ActivityDto) {
    return this.activityService.addActivity(dto);
  }

  @Delete('/:id')
  deleteCategoryById(@Param('id') id: string) {
    return this.activityService.deleteActivityById(id);
  }

  @Put('/:id')
  updateCategoryById(@Body() dto: ActivityDto, @Param('id') id: string) {
    return this.activityService.updateActivityById(dto, id);
  }
}
