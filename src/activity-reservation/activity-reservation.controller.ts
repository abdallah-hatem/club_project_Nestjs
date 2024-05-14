import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActivityReservationService } from './activity-reservation.service';
import { ActivityReservationDto, ReservedDataDto } from './dto';

@Controller('activity-reservation')
export class ActivityReservationController {
  constructor(private activityReservationService: ActivityReservationService) {}

  @Get()
  getAllReservations() {
    return this.activityReservationService.getAllReservations();
  }

  @Post('booked')
  getReservationById(@Body() dto: ReservedDataDto) {
    return this.activityReservationService.getReservedTimes(dto);
  }

  @Post()
  addReservation(@Body() dto: ActivityReservationDto) {
    return this.activityReservationService.addActivityReservation(dto);
  }
}
