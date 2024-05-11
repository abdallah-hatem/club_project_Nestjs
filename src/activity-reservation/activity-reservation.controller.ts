import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActivityReservationService } from './activity-reservation.service';
import { ActivityReservationDto } from './dto';

@Controller('activity-reservation')
export class ActivityReservationController {
  constructor(private activityReservationService: ActivityReservationService) {}

  @Get()
  getAllActivities() {
    return this.activityReservationService.getAllReservations();
  }

  @Post()
  addCategory(@Body() dto: ActivityReservationDto) {
    return this.activityReservationService.addActivityReservation(dto);
  }
}
