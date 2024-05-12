import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ActivityModule } from './activity/activity.module';
import { ActivityReservationModule } from './activity-reservation/activity-reservation.module';
import { FieldModule } from './field/field.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    ActivityModule,
    ActivityReservationModule,
    FieldModule,
  ],
})
export class AppModule {}
