import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userUpdateDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        include: { cart: true },
      });

      if (!users) throw new HttpException('Error in database', 500);

      return { users };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }

  async getUserById(userId: string) {
    try {
      const id = Number(userId);

      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) throw new HttpException('Error in database', 500);

      return { user };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
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
      return error;
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

      if (!deletedUser) throw new HttpException('Error in database', 500);

      return { msg: 'successfully deleted', deletedUser };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
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

      if (!updatedUser) throw new HttpException('Error in database', 500);

      return { msg: 'User updated successfully', updatedUser };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
    }
  }
}
