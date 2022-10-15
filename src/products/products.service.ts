import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const existProduct = await this.productRepository.findOne({
      where: { id },
    });
    if (!existProduct)
      throw new NotFoundException(`Not found product id ${id}`);

    return existProduct;
  }
}
