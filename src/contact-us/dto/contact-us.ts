import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactUsDto {
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateContactUsDto {
  @IsString()
  @IsOptional()
  phone_number: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  description: string;
}
