import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

const DEFAULT_CATEGORIES = [
  { name: 'Electronics', description: 'Electronic devices and accessories' },
  { name: 'Furniture', description: 'Home and office furniture' },
  { name: 'Accessories', description: 'Bags, watches, and everyday accessories' },
  { name: 'Storage', description: 'SSDs, flash drives, and storage devices' },
];

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    const count = await this.categoriesRepository.count();
    if (count === 0) {
      await this.categoriesRepository.save(
        DEFAULT_CATEGORIES.map((category) => this.categoriesRepository.create(category)),
      );
    }
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ order: { name: 'ASC' } });
  }

  findOne(id: number): Promise<Category | null> {
    return this.categoriesRepository.findOne({ where: { id } });
  }
}
