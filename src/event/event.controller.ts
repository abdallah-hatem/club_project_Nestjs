import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto, UpdateEventDto } from './dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Get()
  getAll() {
    return this.eventService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.eventService.getOne(id);
  }

  @Post()
  addEvent(@Body() dto: EventDto) {
    return this.eventService.addEvent(dto);
  }

  @Put(':id')
  updateEvent(@Body() dto: UpdateEventDto, @Param('id') id: string) {
    return this.eventService.updateEvent(dto, id);
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    return this.eventService.deleteEvent(id);
  }
}
