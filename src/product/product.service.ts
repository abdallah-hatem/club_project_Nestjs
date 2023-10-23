import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const products = await this.prisma.product.findMany({
      include: {
        Category: true,
        SizeToColors: { include: { size: true, colors: true } },
      },
    });

    if (!products) return { msg: 'No products found!' };

    return { products };
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
      console.log(error);
      return { error };
    }
  }

  async addProduct(dto: ProductDto) {
    const { name, price, desc, categoryId, sizeToColors } = dto;

    // const testData = {
    //   name: 'New shirt',
    //   desc: 'desccc',
    //   price: 20,
    //   categoryId: 1,
    //   sizeToColors: [
    //     { sizeId: 2, colors: [2], quantity: 20 },
    //     { sizeId: 1, colors: [1], quantity: 12 },
    //   ],
    // };

    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name,
          desc,
          price,
          categoryId,
        },
      });
      const productId = newProduct.id;

      sizeToColors.forEach((el) => {
        this.sizeToColorsService.addSizeToColors({
          productId,
          sizeId: el.sizeId,
          quantity: el.quantity,
          colors: el.colors,
        });
      });

      return { newProduct };
    } catch (error) {
      return { error };
    }
  }

  async editProduct(dto: ProductDto, productId: string) {
    const id = Number(productId);

    const { name, price, desc, categoryId, sizeToColors } = dto;

    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: {
          name,
          price,
          desc,
          categoryId,
        },
        include: { SizeToColors: { include: { colors: true, size: true } } },
      });

      if (!updatedProduct)
        throw new HttpException('Erro!', HttpStatus.BAD_REQUEST);

      if (sizeToColors) {
        const updatedSTC = sizeToColors.map((el) =>
          this.sizeToColorsService.updateSizeToColors(
            {
              sizeId: el.sizeId,
              colors: el.colors,
              quantity: el.quantity,
              productId: id,
            },
            String(el.sizeToColorsId),
          ),
        );

        if (!updatedSTC)
          throw new HttpException('Erro!', HttpStatus.BAD_REQUEST);
      }

      return { updatedProduct };
    } catch (error) {
      return { error };
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
      console.log(error);
      return { error };
    }
  }
}
