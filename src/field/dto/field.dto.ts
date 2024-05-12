import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FieldDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  activity_id: number;
}
