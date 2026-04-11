import { IsString, IsNumber, IsPositive, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name!: string;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price!: number;

  @IsString()
  @MinLength(10, { message: 'Description must be at least 10 characters' })
  description!: string;
}