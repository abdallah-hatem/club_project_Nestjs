import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SportService } from './sport.service';
import { SportDto } from './dto';

@Controller('sport')
export class SportController {
  constructor(private sportService: SportService) {}

  @Get()
  getAll() {
    return this.sportService.getAllSports();
  }

  @Post()
  addSport(@Body() dto: SportDto) {
    return this.sportService.addSport(dto);
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.sportService.getOne(id);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string) {
    return this.sportService.deleteOne(id);
  }

  @Put('/:id')
  updateSport(@Body() dto: SportDto, @Param('id') id: string) {
    return this.sportService.updateSport(id, dto);
  }
}
