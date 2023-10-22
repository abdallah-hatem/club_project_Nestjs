import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SizesService } from './sizes.service';
import { SizeDto } from './dto';

@Controller('sizes')
export class SizesController {
  constructor(private sizesService: SizesService) {}

  @Get()
  getAllSizes() {
    return this.sizesService.getAllSizes();
  }

  @Post()
  addSize(@Body() dto: SizeDto) {
    return this.sizesService.addSize(dto);
  }

  @Delete('/:id')
  deleteSizeById(@Param('id') dto: string) {
    return this.sizesService.deleteSizeById(dto);
  }
}
