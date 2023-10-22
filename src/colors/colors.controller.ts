import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorDto } from './dto';

@Controller('colors')
export class ColorsController {
  constructor(private colorsService: ColorsService) {}

  @Get()
  getAllColors() {
    return this.colorsService.getAllColors();
  }

  @Post()
  addColor(@Body() dto: ColorDto) {
    return this.colorsService.addColor(dto);
  }

  @Delete('/:id')
  deleteColorById(@Param('id') dto: string) {
    return this.colorsService.deleteColorById(dto);
  }
}
