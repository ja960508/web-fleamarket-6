import { IsNumber } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  sellerId: number;

  @IsNumber()
  buyerId: number;

  @IsNumber()
  productId: number;
}
