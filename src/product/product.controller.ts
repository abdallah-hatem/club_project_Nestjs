import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductDto } from './dto';
import { ProductService } from './product.service';
import { JwtGuard } from '../auth/guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(JwtGuard)
  @Get('')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @UseGuards(JwtGuard)
  @Get('/:id')
  getProductById(@Param('id') dto: string) {
    return this.productService.getProductById(dto);
  }

  @UseGuards(JwtGuard)
  @Post('')
  addProduct(@Body() dto: ProductDto) {
    return this.productService.addProduct(dto);
  }

  @UseGuards(JwtGuard)
  @Put('/:id')
  updateProduct(@Body() dto: ProductDto, @Param('id') id: string) {
    return this.productService.updateProduct(dto, id);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get('/:id')
  getPaginatedProducts(@Param('id') pageNumber: string) {
    return this.productService.getPaginatedProducts(pageNumber);
  }
}
