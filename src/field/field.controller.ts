import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldDto, UpdateFieldDto } from './dto';

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

  @Get('/activity/:id')
  getFieldsByActivityId(@Param('id') id: string) {
    return this.fieldService.getFieldsByActivityId(id);
  }

  @Post()
  addField(@Body() dto: FieldDto) {
    return this.fieldService.addField(dto);
  }

  @Delete('/:id')
  deleteFieldById(@Param('id') id: string) {
    return this.fieldService.deleteFieldById(id);
  }

  @Put('/:id')
  updateFieldById(@Body() dto: UpdateFieldDto, @Param('id') id: string) {
    return this.fieldService.updateFieldById(dto, id);
  }
}
