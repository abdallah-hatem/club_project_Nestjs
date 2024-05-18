import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;
}
