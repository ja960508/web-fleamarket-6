import { Injectable } from '@nestjs/common';
import { S3Service } from 'src/config/s3/s3.service';

@Injectable()
export class ProductService {
  constructor(private readonly awsS3Service: S3Service) {}

  async uploadThumbnails(files: Array<Express.Multer.File>) {
    return await this.awsS3Service.uploadFile(files[0]);
  }
}
