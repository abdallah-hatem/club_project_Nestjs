import { Module } from '@nestjs/common';
import { ActivityReservationService } from './activity-reservation.service';
import { ActivityReservationController } from './activity-reservation.controller';

@Module({
  providers: [ActivityReservationService],
  controllers: [ActivityReservationController]
})
export class ActivityReservationModule {}
