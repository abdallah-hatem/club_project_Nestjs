import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldDto } from './dto';

@Controller('field')
export class FieldController {
  constructor(private fieldService: FieldService) {}

  @Get()
  getAllFields() {
    return this.fieldService.getAllFields();
  }

  @Get('/:id')
  getFieldById(@Param('id') id: string) {
    return this.fieldService.getFieldById(id);
  }

  @Post()
  addField(@Body() dto: FieldDto) {
    return this.fieldService.addField(dto);
  }
}
