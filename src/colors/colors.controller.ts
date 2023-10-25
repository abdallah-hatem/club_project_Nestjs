import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ColorsService } from './colors.service';
import { ColorDto, ColorUpdateDto } from './dto';

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

  @Put('/:id')
  updateColorById(@Body() dto: ColorUpdateDto, @Param('id') id: string) {
    return this.colorsService.updateColorById(dto, id);
  }
}
