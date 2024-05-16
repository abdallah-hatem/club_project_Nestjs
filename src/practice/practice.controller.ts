import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PracticeService } from './practice.service';
import { PracticeDto, UpdatePracticeDto } from './dto';

@Controller('practice')
export class PracticeController {
  constructor(private practiceService: PracticeService) {}

  @Get()
  getAllPractices() {
    return this.practiceService.getAllPractices();
  }

  @Get('/:id')
  getPracticeById(@Param('id') id: string) {
    return this.practiceService.getPracticeById(id);
  }

  @Post()
  addPractice(@Body() dto: PracticeDto) {
    return this.practiceService.addPractice(dto);
  }

  @Delete('/:id')
  deletePracticeById(@Param('id') id: string) {
    return this.practiceService.deletePracticeById(id);
  }

  @Put('/:id')
  updatePracticeById(@Body() dto: UpdatePracticeDto, @Param('id') id: string) {
    return this.practiceService.updatePracticeById(dto, id);
  }
}
