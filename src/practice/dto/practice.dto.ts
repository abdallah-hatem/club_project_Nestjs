import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PracticeDto {
  @IsNumber()
  @IsNotEmpty()
  sport_id: number;

  @IsNumber()
  @IsNotEmpty()
  coach_id: number;

  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  days: string;
}

export class UpdatePracticeDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  sport_id: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  coach_id: number;

  @IsOptional()
  @IsString()
  from: string;

  @IsOptional()
  @IsString()
  to: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  days: string;
}
