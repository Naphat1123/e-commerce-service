import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderService } from '../order/order.service';
import { hashingPassword } from '../util/hashing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    // check duplicate username
    const existUsername = await this.userRepository
      .createQueryBuilder('users')
      .where('LOWER(users.username)=LOWER(:username)', {
        username: createUserDto.username,
      })
      .getOne();
    if (existUsername)
      throw new BadRequestException('username has been exists');

    // check duplicate email
    const existEmail = await this.userRepository
      .createQueryBuilder('users')
      .where('LOWER(users.email)=LOWER(:email)', {
        email: createUserDto.email,
      })
      .getOne();
    if (existEmail) throw new BadRequestException('email has been exists');

    // hashing password
    createUserDto.password = await hashingPassword(createUserDto.password);

    const user = this.userRepository.create(createUserDto);
    const saved = await this.userRepository.save(user);
    const { password, ...result } = saved;
    return result;
  }

  async findOne(id: number) {
    const existUser = await this.userRepository.findOneBy({ id });
    if (!existUser) throw new NotFoundException(`Not found user id ${id} `);

    const { password, ...result } = existUser;
    return result;
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async getOrder(id: number) {
    return this.orderService.findOrderByUserId(id);
  }
}
