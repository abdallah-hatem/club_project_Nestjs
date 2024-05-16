import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookPracticeService } from './book-practice.service';
import { BookPracticeDto } from './dto';

@Controller('book-practice')
export class BookPracticeController {
  constructor(private bookPracticeService: BookPracticeService) {}

  @Get()
  getAllBookedPractices() {
    return this.bookPracticeService.getAllBookedPractices();
  }

  @Get('/:id')
  getBookPracticeByUserId(@Param('id') id: string) {
    return this.bookPracticeService.getBookPracticeByUserId(id);
  }

  @Post()
  addBookPractice(@Body() dto: BookPracticeDto) {
    return this.bookPracticeService.addBookPractice(dto);
  }
}
