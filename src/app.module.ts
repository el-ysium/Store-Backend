import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    // Load .env globally and make it available everywhere
    ConfigModule.forRoot({ isGlobal: true }),

    // Connect TypeORM to PostgreSQL using env vars
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User, Product, Category],
        synchronize: true, // auto-creates tables from entities — dev only!
        ssl: config.get('DB_HOST')?.includes('neon.tech')
          ? { rejectUnauthorized: false }
          : false,
      }),
    }),

    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
  ],
})
export class AppModule {}