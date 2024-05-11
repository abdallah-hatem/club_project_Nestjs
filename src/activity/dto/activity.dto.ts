import { IsNotEmpty, IsString } from 'class-validator';

export class ActivityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
