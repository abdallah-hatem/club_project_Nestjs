import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { AdminGuard } from '../auth/guard/admin.guard';
import { userUpdateDto } from './dto';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AdminGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') dto: string) {
    return this.userService.deleteUserById(dto);
  }

  @Put('/:id')
  updateUserById(@Body() dto: userUpdateDto, @Param('id') id: string) {
    return this.userService.updateUserById(dto, id);
  }
}
