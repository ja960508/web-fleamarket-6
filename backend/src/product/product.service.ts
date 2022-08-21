import { HttpException, Injectable } from '@nestjs/common';
import { S3Service } from 'src/config/s3/s3.service';

@Injectable()
export class ProductService {
  constructor(private readonly awsS3Service: S3Service) {}

  async uploadThumbnails(thumbnails: Array<Express.Multer.File>) {
    try {
      const uploadPromise = thumbnails.map((thumbnail) =>
        this.awsS3Service.uploadFile(thumbnail),
      );

      const thumbnailUrls = await Promise.all(uploadPromise);
      return thumbnailUrls;
    } catch (e) {
      console.error(e);
      throw new HttpException('Failed to upload Image.', 500);
    }
  }
}
