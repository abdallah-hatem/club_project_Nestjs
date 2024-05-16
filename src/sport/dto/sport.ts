import { IsNotEmpty, IsString } from 'class-validator';

export class SportDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
