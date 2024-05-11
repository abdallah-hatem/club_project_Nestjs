import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url:
            process.env.NODE_ENV === 'developmemt'
              ? process.env.DATABASE_URL
              : process.env.POSTGRES_PRISMA_URL,
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([this.user.deleteMany()]);
  }
}
