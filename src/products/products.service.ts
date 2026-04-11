import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductType } from './entities/product.type';

type Product = ProductType & { id: number; createdAt: Date };

@Injectable()
export class ProductsService {

  private products: Product[] = [];
  private nextId = 1;

  // --- READ ALL ---
  findAll(): Product[] {
    return this.products;
  }

  // --- READ ONE ---
  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  // --- CREATE ---
  create(dto: ProductType): Product {
    const newProduct: Product = {
      id: this.nextId++,         // auto-increment
      createdAt: new Date(),     // current timestamp
      ...dto,                    // spread the incoming fields
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // --- UPDATE ---
  update(id: number, dto: ProductType): Product {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    

    this.products[index] = { ...this.products[index], ...dto };
    return this.products[index];
  }

  // --- DELETE ---
  remove(id: number): { message: string } {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
    return { message: `Product ${id} deleted` };
  }
}