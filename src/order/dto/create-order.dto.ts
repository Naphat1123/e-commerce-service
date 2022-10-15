import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../products/dto/product.dto';
export class CreateOrderDto {
  @ApiProperty({ type: [ProductDto] })
  productList: ProductDto[];
}
