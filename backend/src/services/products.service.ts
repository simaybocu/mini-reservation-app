import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  findAll() { return this.repo.find(); }
  findOne(id: string) { return this.repo.findOne({ where: { id: Number(id) } }); }

  async seedIfEmpty() {
    const count = await this.repo.count();
    if (count > 0) return;
    const items = [
      { title: 'Simay', description: 'Hourly moonlight boat tour', capacity: 15, imageUrl: 'https://images.unsplash.com/photo-1630520611788-67798f81e6d6', location: 'Antalya' },
      { title: 'Blue Horizon', description: 'Comfortable cruise boat', capacity: 8, imageUrl: 'https://images.unsplash.com/photo-1667153271375-30b383fdfa0e', location: 'Istanbul' },
      { title: 'Sea Breeze', description: 'Pleasant ride in light winds', capacity: 4, imageUrl: 'https://images.unsplash.com/photo-1700825833395-22edd8973341', location: 'Bodrum' }
    ];
    await this.repo.save(items.map(i => this.repo.create(i)));
  }
}
