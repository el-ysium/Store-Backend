import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
  
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  description?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price?: number;

  @Column({ default: 0 })
  stock?: number;

  @ManyToOne(() => User, (user) => user.products, { eager: false })
  owner?: User;

  @ManyToOne(() => Category, (category) => category.products, { eager: false })
  category?: Category;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}