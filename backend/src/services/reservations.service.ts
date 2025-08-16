import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../models/reservation.entity';
import { Product } from '../models/product.entity';
import { User } from '../models/user.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation) private repo: Repository<Reservation>,
    @InjectRepository(Product) private products: Repository<Product>,
    @InjectRepository(User) private users: Repository<User>
  ) {}

  private onlyDate(date: Date) {
    const d = new Date(date);
    d.setHours(0,0,0,0);
    return d;
  }

  async create(userId: string, productId: number, date: string) {
    const selected = this.onlyDate(new Date(date));
    const today = this.onlyDate(new Date());
    if (isNaN(selected.getTime())) throw new BadRequestException('Invalid date');
    if (selected < today) throw new BadRequestException('Date must be in the future');

    const user = await this.users.findOne({ where: { id: Number(userId) } });
    if (!user) throw new NotFoundException('User not found');
    const product = await this.products.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    const iso = selected.toISOString().slice(0,10);
    const conflict = await this.repo.findOne({ where: { product: { id: product.id }, date: iso } });
    if (conflict) throw new BadRequestException('Product already reserved for this date');

    const reservation = this.repo.create({ user, product, date: iso });
    return this.repo.save(reservation);
  }

  async listForUser(userId: string) {
    return this.repo.find({ where: { user: { id: Number(userId) } }, order: { date: 'ASC' } });
  }

  async listAll() {
    return this.repo.find({ order: { date: 'ASC' } });
  }
}
