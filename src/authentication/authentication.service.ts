import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { compare } from '../util/hashing';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    const user = await this.userService.findByUsername(login.username);
    if (!user) throw new UnauthorizedException();

    const isMatch = await compare(login.password, user.password);
    if (!isMatch) throw new UnauthorizedException('password is not correct.');

    return this.payload(user);
  }

  async payload(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
    };
    return this.generateToken(payload);
  }

  async generateToken(payload: any) {
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
