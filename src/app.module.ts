import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ActivityModule } from './activity/activity.module';
import { ActivityReservationModule } from './activity-reservation/activity-reservation.module';
import { FieldModule } from './field/field.module';
import { EventModule } from './event/event.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { FaqsModule } from './faqs/faqs.module';
import { SportModule } from './sport/sport.module';
import { CoachModule } from './coach/coach.module';
import { CoachService } from './coach/coach.service';
import { CoachController } from './coach/coach.controller';
import { PracticeModule } from './practice/practice.module';
import { BookPracticeModule } from './book-practice/book-practice.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    PrismaModule,
    ActivityModule,
    ActivityReservationModule,
    FieldModule,
    EventModule,
    ContactUsModule,
    FaqsModule,
    SportModule,
    CoachModule,
    PracticeModule,
    BookPracticeModule,
  ],
  controllers: [CoachController],
  providers: [CoachService],
})
export class AppModule {}
