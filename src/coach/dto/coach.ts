import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CoachDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNumber()
  @IsNotEmpty()
  years_of_experience: number;

  @IsString()
  @IsNotEmpty()
  brief: string;
}
