import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_SCHEMA,
      entities: [path.join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
    }),
    UsersModule,
    AuthenticationModule,
    ProductsModule,
    OrderModule,
  ],
})
export class AppModule {}
