import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.entity';

@Injectable()
export class AuthService {
  constructor(private users: UsersService) {}

  async register(email: string, password: string) {
    const exists = await this.users.findByEmail(email);
    if (exists) throw new UnauthorizedException('Email already registered');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.users.create(email, hash, false);
    return this.sign(user);
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return this.sign(user);
  }

  sign(user: User) {
    const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };
    const token = new JwtService({ secret: process.env.JWT_SECRET }).sign(payload);
    return { token, user: { id: user.id, email: user.email, isAdmin: user.isAdmin } };
  }
}
