import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';

@Entity('users', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];
}
