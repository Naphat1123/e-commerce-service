import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}
