import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private userService: UserService,
  ) {}

  async signup(dto: AuthDto) {
    const { name, email, password } = dto;

    const hash = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          cart: { create: [{}] },
        },
      });

      return { msg: 'successfully signed up', user };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken');
        }
      }
      return { error };
    }
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    try {
      // check if user already exists
      const user = await this.userService.getUserByEmail(email);

      if (!user.user) {
        throw new NotFoundException('No user found please signup!');
      }

      const userPass = user.user.password;
      // compare passwords
      const validPass = await bcrypt.compare(password, userPass);

      if (!validPass) {
        throw new ForbiddenException('Password is incorrect!').getResponse();
      }

      const jwt = await this.signToken(user.user.id, user.user.email);

      return { msg: 'successfully logged in', jwt };
    } catch (error) {
      console.log(error);

      return { error };
    }
  }

  signToken(id: number, email: string): Promise<string> {
    const payload = {
      id,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: process.env.JWT_SECRET,
    });
  }
}
