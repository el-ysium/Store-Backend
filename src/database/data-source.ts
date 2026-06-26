import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';

config();

const host = process.env.DB_HOST ?? 'localhost';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Product, Category],
  synchronize: true,
  ssl: host.includes('neon.tech') ? { rejectUnauthorized: false } : false,
});
