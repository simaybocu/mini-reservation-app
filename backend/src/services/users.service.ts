import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(email: string, passwordHash: string, isAdmin = false) {
    const u = this.repo.create({ email, passwordHash, isAdmin });
    return this.repo.save(u);
  }
}
