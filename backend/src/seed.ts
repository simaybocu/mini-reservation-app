import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './orm/typeorm.config';
import { User } from './models/user.entity';
import { Product } from './models/product.entity';
import { Reservation } from './models/reservation.entity';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { logger } from './utils/logger';
dotenv.config();

(async () => {
  const opts = typeOrmConfig([User, Product, Reservation]);
  const ds = new DataSource(opts as any);
  await ds.initialize();

  const userRepo = ds.getRepository(User);
  const productRepo = ds.getRepository(Product);

  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const pwd = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = await userRepo.findOne({ where: { email } });
  if (!existing) {
    const hash = await bcrypt.hash(pwd, 10);
    const admin = userRepo.create({ email, passwordHash: hash, isAdmin: true });
    await userRepo.save(admin);
    logger.info('Admin user created:', email);
  } else {
    logger.info('Admin user exists:', email);
  }

  const count = await productRepo.count();
  if (count === 0) {
    const items = [
      {
        title: 'Simay',
        description: 'Hourly moonlight boat tour',
        capacity: 15,
        imageUrl:
          'https://images.unsplash.com/photo-1630520611788-67798f81e6d6',
        location: 'Antalya',
      },
      {
        title: 'Blue Horizon',
        description: 'Comfortable cruise boat',
        capacity: 8,
        imageUrl:
          'https://images.unsplash.com/photo-1667153271375-30b383fdfa0e',
        location: 'Istanbul',
      },
      {
        title: 'Sea Breeze',
        description: 'Pleasant ride in light winds',
        capacity: 4,
        imageUrl:
          'https://images.unsplash.com/photo-1700825833395-22edd8973341',
        location: 'Bodrum',
      },
    ];
    await productRepo.save(items.map((i) => productRepo.create(i)));
    logger.info('Seeded products.');
  } else {
    logger.info('Products already seeded.');
  }

  await ds.destroy();
})();
