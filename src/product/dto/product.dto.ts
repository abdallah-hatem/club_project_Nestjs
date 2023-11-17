import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

type STC = {
  sizeId: number;
  colors: [number];
  quantity: number;
  sizeToColorsId: number;
};

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  sizeToColors: Array<STC>;
}
