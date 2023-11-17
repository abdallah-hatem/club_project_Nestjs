import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

export class SizeToColorsDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  sizeId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  colors: Array<number>;
}

export class SizeToColorsUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsOptional()
  sizeId: number;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  colors: Array<number>;
}
