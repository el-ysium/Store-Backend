import {
  Entity, PrimaryGeneratedColumn, Column,
  OneToMany, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import type { Product } from '../../products/entities/product.entity';
import type { Relation } from 'typeorm';                                     // ← add this


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column({ unique: true })   // no two users can share an email
  email?: string;

  @Column()
  phoneNumber?: string;

  @Column()
  password?: string;           // stored as bcrypt hash, never plain text

  @OneToMany('Product', 'owner')          // ← strings instead of class references
  products?: Relation<Product[]>;  

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}