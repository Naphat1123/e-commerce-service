import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity('order', { schema: 'public' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  product: Product[];

  @Column()
  orderStatus: string;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @Column({ nullable: true })
  createdAt?: Date;
}
