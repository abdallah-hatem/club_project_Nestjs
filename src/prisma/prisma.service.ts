import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: { url: process.env.DATABASE_URL },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.product.deleteMany(),
      this.user.deleteMany(),
      this.cart.deleteMany(),
      this.cartItem.deleteMany(),
      this.category.deleteMany(),
      this.colors.deleteMany(),
      this.sizes.deleteMany(),
      this.sizeToColors.deleteMany(),
    ]);
  }
}
