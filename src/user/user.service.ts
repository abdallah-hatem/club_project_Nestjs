import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userUpdateDto } from './dto';

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

  async getUserById(userId: string) {
    const id = Number(userId);

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

  async getUserByEmail(email: string) {
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

  async deleteUserById(userId: string) {
    try {
      const id = Number(userId);
      const deletedUser = await this.prisma.user.delete({
        where: {
          id,
        },
      });

      if (!deletedUser) throw new Error('error');

      return { msg: 'successfully deleted', deletedUser };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async updateUserById(dto: userUpdateDto, userId: string) {
    try {
      const { name, email } = dto;
      const id = Number(userId);

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { name, email },
      });

      if (!updatedUser) throw new Error('Error!');

      return { msg: 'User updated successfully', updatedUser };
    } catch (error) {
      console.log({ error });
      return { error };
    }
  }
}
