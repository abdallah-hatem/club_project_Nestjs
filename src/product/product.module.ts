import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SizeToColorService } from '../size-to-color/size-to-color.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, SizeToColorService],
})
export class ProductModule {}
