import { Module } from '@nestjs/common';
import { BookPracticeService } from './book-practice.service';
import { BookPracticeController } from './book-practice.controller';

@Module({
  providers: [BookPracticeService],
  controllers: [BookPracticeController]
})
export class BookPracticeModule {}
