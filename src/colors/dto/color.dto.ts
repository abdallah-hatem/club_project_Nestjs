import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ColorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  hex: string;
}

export class ColorUpdateDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  hex: string;
}
