import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products', { schema: 'public' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
}
