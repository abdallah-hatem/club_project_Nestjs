import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { SizeToColorService } from '../size-to-color/size-to-color.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private sizeToColorsService: SizeToColorService,
  ) {}

  async getAllProducts() {
    try {
      const products = await this.prisma.product.findMany({
        include: {
          Category: true,
          SizeToColors: { include: { size: true, colors: true } },
        },
      });

      if (!products) throw new HttpException('Error in database', 500);

      return { products };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async getProductById(dto: string) {
    try {
      const id = Number(dto);

      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          Category: true,
          SizeToColors: { include: { size: true, colors: true } },
        },
      });

      if (!product)
        throw new HttpException(
          'Error! product not found',
          HttpStatus.NOT_FOUND,
        );

      return { product };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async addProduct(dto: ProductDto) {
    const { name, price, desc, categoryId, sizeToColors } = dto;

    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name,
          desc,
          price,
          categoryId,
        },
      });

      if (!newProduct) throw new HttpException('Error in database', 500);

      const productId = newProduct.id;

      sizeToColors.forEach((el) => {
        const addedSTC = this.sizeToColorsService.addSizeToColors({
          productId,
          sizeId: el.sizeId,
          quantity: el.quantity,
          colors: el.colors,
        });
        if (!addedSTC) throw new HttpException('Error!', 400);
      });

      return { msg: 'Product created successfully', newProduct };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async updateProduct(dto: ProductDto, productId: string) {
    try {
      const id = Number(productId);

      const { name, price, desc, categoryId } = dto;

      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          name,
          price,
          desc,
          categoryId,
        },
      });

      if (!updatedProduct) throw new HttpException('Error!', 400);

      return { msg: 'Successfully updated', updatedProduct };
    } catch (error) {
      if (error) {
        const { message, status } = error;
        throw new HttpException(message, status);
      }

      return error;
    }
  }

  async deleteProduct(productId: string) {
    try {
      const id = Number(productId);

      const deletedProduct = await this.prisma.product.delete({
        where: { id },
      });

      if (!deletedProduct) {
        throw new Error('Error! product could not be deleted');
      }

      return { msg: 'Product deleted successfully' };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async getPaginatedProducts(pageNumber: string) {
    try {
      const page = Number(pageNumber);
      const items = 2;

      function skips(page: number) {
        if (page === 1) return 0;

        return page * items;
      }

      const products = await this.prisma.product.findMany({
        skip: skips(page),
        take: items,
      });

      if (!products) throw new NotFoundException().getResponse();

      return { products };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  ///////////////////////////////////////////////
}
