import { IsOptional, IsNumber, IsString } from 'class-validator';

export type ProductFilterType = 'sale' | 'like';

export class ProductGetOptions {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsString()
  @IsOptional()
  filter?: ProductFilterType;
}
