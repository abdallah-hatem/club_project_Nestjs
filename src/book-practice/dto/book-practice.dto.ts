import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookPracticeDto {
  @IsNumber()
  @IsNotEmpty()
  practice_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
