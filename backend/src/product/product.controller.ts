import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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