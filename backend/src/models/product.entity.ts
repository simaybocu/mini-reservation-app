import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Reservation } from './reservation.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 1 })
  capacity: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  location: string;

  @OneToMany(() => Reservation, (r) => r.product)
  reservations: Reservation[];
}
