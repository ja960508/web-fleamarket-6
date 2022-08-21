import {
  IsOptional,
  IsNumber,
  IsString,
  IsNumberString,
} from 'class-validator';

export type ProductFilterType = 'sale' | 'like';

export class ProductsGetOptions {
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

export class ProductParam {
  @IsNumber()
  productId: number;
}
