import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmConfig = (entities: any[]): TypeOrmModuleOptions => {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '5432', 10);
  const username = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASS || 'postgres';
  const database = process.env.DB_NAME || 'reservation_db';

  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    entities,
    synchronize: true,
    logging: false
  };
};
