import { IsNumberString } from 'class-validator';

export class DeleteProductDto {
  @IsNumberString({}, { message: 'ID must be a numeric value' })
  id!: string;
}