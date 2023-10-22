import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class userId {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class userEmail {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
