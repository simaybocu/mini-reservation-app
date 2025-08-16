import { Entity, Column, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity({ name: 'reservations' })
@Unique(['product', 'date'])
export class Reservation extends BaseEntity {
  @ManyToOne(() => User, (u) => u.reservations, { eager: true })
  user: User;

  @ManyToOne(() => Product, (p) => p.reservations, { eager: true })
  product: Product;

  @Column({ type: 'date' })
  date: string; // YYYY-MM-DD
}
