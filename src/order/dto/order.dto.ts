import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../products/dto/product.dto';
import { UserDto } from '../../users/dto/user.dto';
export class OrderDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  orderStatus: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  product: ProductDto[];

  @ApiProperty()
  user: UserDto;
}
