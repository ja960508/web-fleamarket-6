import { HttpException, Injectable } from '@nestjs/common';
import { MySQLService } from 'src/config/mysql/mysql.service';
import { S3Service } from 'src/config/s3/s3.service';
import formatData from 'src/utils/format';
import { PostType } from './product.type';

@Injectable()
export class ProductService {
  constructor(
    private readonly awsS3Service: S3Service,
    private mysqlService: MySQLService,
  ) {}

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

  async writePost(post: PostType) {
    try {
      const postData = {
        ...post,
        createdAt: Date.now(),
        isSold: 0,
        viewCount: 0,
      };

      const [res] = await this.mysqlService.pool.execute(`
        INSERT INTO PRODUCT (${Object.keys(postData).join()})
        VALUES (${Object.values(postData).map(formatData).join()})
        `);

      return 'created';
    } catch (e) {
      console.error(e);
      throw new HttpException('Failed to upload Post.', 500);
    }
  }
}
