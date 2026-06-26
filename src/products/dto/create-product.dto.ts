import { IsString, IsNumber, IsPositive, MinLength, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name?: string;

  @IsString()
  @MinLength(10)
  description?: string;

  @IsNumber()
  @IsPositive()
  price?: number;

  @IsInt()
  @Min(0)
  stock?: number;

  @IsInt()
  @IsPositive()
  categoryId?: number;
}