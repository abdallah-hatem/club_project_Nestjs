import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class ActivityReservationDto {
  @IsDateString() //  ISO 8601: 2024-05-09T22:00:00.000Z
  @IsNotEmpty()
  from: Date;

  @IsDateString()
  @IsNotEmpty()
  to: Date;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  activity_id: number;
}
