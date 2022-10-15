import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { ProductDto } from './dto/product.dto';

@Controller('products')
@ApiTags('Products')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.productsService.create(createProduct);
  }

  @Get()
  @ApiOkResponse({ type: [ProductDto] })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductDto })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}
