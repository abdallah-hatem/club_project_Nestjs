import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto, LoginDto } from './dto';
import * as bcrypt from 'bcrypt';

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
    try {
      const { name, email, password, address, id_card } = dto;

      const hash = await bcrypt.hash(password, 10);

      const membership_id = this.generateRandomString(20);

      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          subscribtion_end_date: new Date(),
          address,
          id_card,
          membership_id,
        },
      });

      if (!user) throw new ForbiddenException('credentials taken');

      return { msg: 'successfully signed up', user };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return { error };
    }
  }

  async login(dto: LoginDto) {
    const { email, password, membership_id } = dto;

    try {
      // check if user already exists
      const user = email
        ? await this.userService.getUserByEmail(email)
        : await this.userService.getUserByMembershipId(membership_id);

      if (!user.user) {
        throw new NotFoundException(
          'No user found please signup!',
        ).getResponse();
      }

      const userPass = user.user.password;
      // compare passwords
      const validPass = await bcrypt.compare(password, userPass);

      if (!validPass) {
        throw new ForbiddenException('Password is incorrect!').getResponse();
      }

      const jwt = await this.signToken(user.user.id, user.user.email);

      return { msg: 'successfully logged in', jwt, user: user.user };
    } catch (error) {
      if (error) {
        const { message, statusCode } = error;
        throw new HttpException(message, statusCode);
      }
      return error;
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

  // helpers
  generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
