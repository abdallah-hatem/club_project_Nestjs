import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ActivityReservationDto {
  @IsString() //  '10:30 AM , 11:30 AM'
  @IsNotEmpty()
  selectedTimes: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  activity_id: number;

  @IsNumber()
  @IsNotEmpty()
  field_id: number;
}

export class ReservedDataDto {
  @IsNumber()
  @IsNotEmpty()
  activity_id: number;

  @IsNumber()
  @IsNotEmpty()
  field_id: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;
}
