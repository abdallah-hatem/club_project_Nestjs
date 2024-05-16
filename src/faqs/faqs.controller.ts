import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsDto, UpdateFaqsDto } from './dto';

@Controller('faqs')
export class FaqsController {
  constructor(private faqsService: FaqsService) {}

  @Get()
  getAll() {
    return this.faqsService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.faqsService.getOne(id);
  }

  @Post()
  addFaq(@Body() dto: FaqsDto) {
    return this.faqsService.addFaq(dto);
  }

  @Put('/:id')
  updateFaq(@Body() dto: UpdateFaqsDto, @Param('id') id: string) {
    return this.faqsService.updateFaq(dto, id);
  }

  @Delete('/:id')
  deleteFaq(@Param('id') id: string) {
    return this.faqsService.deleteFaq(id);
  }
}
