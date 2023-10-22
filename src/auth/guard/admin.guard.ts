import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
// import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (request) {
      try {
        const token = request.headers.authorization.replace('Bearer ', '');

        const decodedToken = Object(this.jwt.decode(token));

        const { id } = decodedToken;

        const user = await this.userService.getUserById(id);
        const { email, password } = user.user;

        const admin = {
          email: 'admin@gmail.com',
          password: 'admin123',
        };
        const validPass = await bcrypt.compare(admin.password, password);

        const validAdmin = email === admin.email && validPass;

        return validAdmin;
      } catch (error) {
        console.log(error);

        return error;
      }
    }

    return false;
  }
}
