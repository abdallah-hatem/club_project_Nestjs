import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachDto } from './dto';

@Controller('coach')
export class CoachController {
  constructor(private coachService: CoachService) {}

  @Get()
  getAll() {
    return this.coachService.getAllCoaches();
  }

  @Post()
  addSport(@Body() dto: CoachDto) {
    return this.coachService.addCoach(dto);
  }

  @Put(':id')
  updateCoach(@Body() dto: CoachDto, @Param('id') id: string) {
    return this.coachService.updateCoach(id, dto);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.coachService.getOne(id);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.coachService.deleteOne(id);
  }
}
