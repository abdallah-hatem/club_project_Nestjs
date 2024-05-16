import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FaqsDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class UpdateFaqsDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  answer: string;
}
