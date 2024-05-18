import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsDto, UpdateNewsDto } from './dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  getAll() {
    return this.newsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.newsService.getOne(id);
  }

  @Post()
  addNews(@Body() dto: NewsDto) {
    return this.newsService.addNews(dto);
  }

  @Put(':id')
  updateNews(@Body() dto: UpdateNewsDto, @Param('id') id: string) {
    return this.newsService.updateNews(dto, id);
  }

  @Delete(':id')
  deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNews(id);
  }
}
