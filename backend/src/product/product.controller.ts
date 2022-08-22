import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import {
  ProductLikeRequestBody,
  ProductParam,
  ProductsGetOptions,
  PostType,
} from './types/product';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('write')
  async writePost(@Body() post: PostType) {
    return this.productService.writePost(post);
  }

  @Post(':productId/like')
  likeOrDislikeProduct(
    @Body() { isLiked, userId }: ProductLikeRequestBody,
    @Param() { productId }: ProductParam,
  ) {
    return this.productService.likeOrDislikeProduct({
      userId,
      productId,
      isLiked,
    });
  }

  @Get(':productId')
  getProductById(
    @Param()
    { productId }: ProductParam,
  ) {
    return this.productService.getProductById(productId);
  }

  @Get()
  getProducts(
    @Query()
    query: ProductsGetOptions,
  ) {
    return this.productService.getProducts(query);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('thumbnails', 10, {
      limits: {
        files: 10,
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  uploadThumbnails(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.productService.uploadThumbnails(files);
  }
}
