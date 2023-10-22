import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService, // private jwt: JwtService,
  ) {}

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        include: { cart: true },
      });

      return { users };
    } catch (error) {
      return { error };
    }
  }

  async getUserById(dto: any) {
    const id = Number(dto);

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      return { user };
    } catch (error) {
      return { error };
    }
  }

  async getUserByEmail(dto: string) {
    const email = dto;

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      return { user };
    } catch (error) {
      return { error };
    }
  }
}
