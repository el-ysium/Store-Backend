import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { ProductType } from './entities/product.type';

@Controller('products')          // all routes start with /products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  //           ↑ NestJS injects the service automatically

  // GET /products
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // POST /products
  @Post()
  create(@Body() dto: ProductType) {
    return this.productsService.create(dto);
  }

  // PATCH /products/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProductType,
  ) {
    return this.productsService.update(id, dto);
  }

  // DELETE /products/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}