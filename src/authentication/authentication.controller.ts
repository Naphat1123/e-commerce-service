import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  login(@Body() login: LoginDto) {
    return this.authenticationService.login(login);
  }

  @Post('/register')
  @ApiOkResponse({
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.register(createUserDto);
  }
}
