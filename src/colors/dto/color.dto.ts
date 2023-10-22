import { IsNotEmpty, IsString } from 'class-validator';

export class ColorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  hex: string;
}
