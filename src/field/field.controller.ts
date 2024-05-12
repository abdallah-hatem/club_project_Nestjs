import { Body, Controller, Get, Post } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldDto } from './dto';

@Controller('field')
export class FieldController {
  constructor(private fieldService: FieldService) {}

  @Get()
  getAllFields() {
    return this.fieldService.getAllFields();
  }

  @Post()
  addField(@Body() dto: FieldDto) {
    return this.fieldService.addField(dto);
  }
}
