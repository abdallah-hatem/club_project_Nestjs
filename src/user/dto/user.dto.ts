import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class userId {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class userUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  role: 'USER' | 'ADMIN';

  @IsOptional()
  @IsDateString() //  ISO 8601: 2024-05-09T22:00:00.000Z
  subscribtion_end_date?: Date;
}
