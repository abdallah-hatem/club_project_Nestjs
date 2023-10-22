import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { AdminGuard } from '../auth/guard/admin.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getUserById(@Param('id') dto: string) {
    return this.userService.getUserById(dto);
  }
}
