import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { ConfirmOrder } from './dto/confirm-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { EStatusOrder } from './enum/comfirm-order.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  async create(createOrderDto: CreateOrderDto, userId: number) {
    const user = await this.userService.findById(userId);

    const product = createOrderDto.productList.map((value) => {
      const productModel: Product = {
        ...value,
      };
      return productModel;
    });

    const order: Order = {
      id: null,
      product: product,
      orderStatus: EStatusOrder.WAITING,
      user,
    };

    const saved = await this.orderRepository.save(order);
    delete saved.user;
    return saved;
  }

  async findAll() {
    const orderModel = await this.orderRepository.find({
      relations: ['product', 'user'],
    });

    return orderModel.map((value) => {
      const order: OrderDto = {
        id: value.id,
        orderStatus: value.orderStatus,
        createdAt: value.createdAt,
        product: value.product,
        user: plainToClass(UserDto, value.user),
      };
      return order;
    });
  }

  async findOne(id: number) {
    const existOrder = await this.orderRepository.findOne({
      where: { id },
      relations: ['product', 'user'],
    });
    if (!existOrder) throw new NotFoundException(`Not found Order id ${id}`);

    const orderDto: OrderDto = {
      id: existOrder.id,
      orderStatus: existOrder.orderStatus,
      createdAt: existOrder.createdAt,
      product: existOrder.product,
      user: plainToClass(UserDto, existOrder.user),
    };

    return orderDto;
  }

  async confirmOrder(id: number, orderStatus: ConfirmOrder) {
    const existOrder = await this.orderRepository.findOne({ where: { id } });
    if (!existOrder) throw new NotFoundException(`Not found Order id ${id}`);

    return this.orderRepository.update(id, orderStatus);
  }

  async findOrderByUserId(id: number) {
    return this.orderRepository.find({
      where: { user: { id } },
      relations: ['product', 'user'],
    });
  }
}
