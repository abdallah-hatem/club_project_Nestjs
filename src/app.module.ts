import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ColorsModule } from './colors/colors.module';
import { SizesModule } from './sizes/sizes.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { SizeToColorModule } from './size-to-color/size-to-color.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    ProductModule,
    CategoryModule,
    ColorsModule,
    SizesModule,
    CartItemModule,
    SizeToColorModule,
  ],
})
export class AppModule {}
