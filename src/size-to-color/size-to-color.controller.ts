import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SizeToColorService } from './size-to-color.service';
import {
  SizeToColorsDto,
  SizeToColorsUpdateDto,
} from './dto/size-to-colors.dto';

@Controller('size-to-colors')
export class SizeToColorController {
  constructor(private sizeToColorsService: SizeToColorService) {}

  @Get()
  getAllSizeToColors() {
    return this.sizeToColorsService.getAllSizeToColors();
  }

  @Post()
  addSizeToColors(@Body() dto: SizeToColorsDto) {
    return this.sizeToColorsService.addSizeToColors(dto);
  }

  @Put('/:id')
  updateSizeToColors(
    @Body() dto: SizeToColorsUpdateDto,
    @Param('id') id: string,
  ) {
    return this.sizeToColorsService.updateSizeToColors(dto, id);
  }
}
