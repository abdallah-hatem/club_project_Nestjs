import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsDto, UpdateContactUsDto } from './dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(private contactUsService: ContactUsService) {}

  @Get()
  getAll() {
    return this.contactUsService.getAll();
  }

  @Post()
  addContactUs(@Body() dto: ContactUsDto) {
    return this.contactUsService.addContactUS(dto);
  }

  @Put('/:id')
  updateContactUs(@Body() dto: UpdateContactUsDto, @Param('id') id: string) {
    return this.contactUsService.updateContactUS(dto, id);
  }
}
