import { IsNotEmpty, IsString } from 'class-validator';

export class SizeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
