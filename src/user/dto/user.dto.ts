import {
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
}
