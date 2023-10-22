import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async decode(token: string) {
    return token;
  }

  async validate(payload: { id: number; email: string }) {
    const { id } = payload;
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    delete user.password;
    return user;
  }
}
