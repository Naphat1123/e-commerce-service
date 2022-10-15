import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOkResponse({ type: UserDto })
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('/order')
  getOrder(@Req() req) {
    const userId = req.user.id;
    return this.usersService.getOrder(userId);
  }
}
