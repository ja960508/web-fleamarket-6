import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { ProductGetOptions } from './types/product';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    query: ProductGetOptions,
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
