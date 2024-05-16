import { IsNotEmpty, IsString } from 'class-validator';

export class CoachDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
