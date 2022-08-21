import { HttpException, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { MySQLService } from 'src/config/mysql/mysql.service';
import { S3Service } from 'src/config/s3/s3.service';
import { ProductGetOptions } from './types/product';

@Injectable()
export class ProductService {
  pool: Pool;
  constructor(
    private readonly awsS3Service: S3Service,
    private readonly mysqlService: MySQLService,
  ) {
    this.pool = mysqlService.pool;
  }

  async getProducts(options: ProductGetOptions) {
    const LIMIT = 10;
    const CALC_TOTAL_COUNT = `SQL_CALC_FOUND_ROWS`;
    const REGION_SUBQUERY = /*sql*/ `(SELECT name from USER JOIN REGION ON USER.regionId = REGION.id where USER.id = authorId) as regionName`;
    const SELECT_WITH = `${CALC_TOTAL_COUNT} ${REGION_SUBQUERY},`;

    const { userId, filter, categoryId, page = 1 } = options;

    if ((userId || filter) && categoryId) {
      throw new HttpException(
        'Filter cannot be provided with category option. Choose one.',
        400,
      );
    }

    if (Boolean(userId) !== Boolean(filter)) {
      throw new HttpException(
        'userId and filter both should be provided.',
        400,
      );
    }

    let beforePaginationQuery = /*sql*/ `SELECT ${SELECT_WITH} PRODUCT.* FROM PRODUCT INNER JOIN REGION`;

    if (filter === 'like') {
      beforePaginationQuery = /*sql*/ `
          SELECT ${SELECT_WITH} P.* FROM PRODUCT AS P INNER JOIN USER_LIKE_PRODUCT AS ULP ON ULP.productId = P.id WHERE ULP.userId = ${userId}
        `;
    }

    if (filter === 'sale') {
      beforePaginationQuery = /*sql*/ `
          SELECT ${SELECT_WITH} PRODUCT.* FROM PRODUCT WHERE authorId = ${userId}
        `;
    }

    if (categoryId) {
      beforePaginationQuery = /*sql*/ `
        SELECT ${SELECT_WITH} PRODUCT.* FROM PRODUCT WHERE categoryId = ${categoryId}
      `;
    }

    const paginatedQuery = /*sql*/ `${beforePaginationQuery} LIMIT ${
      (page - 1) * LIMIT
    }, ${LIMIT}`;

    const [result] = await this.pool.query(paginatedQuery);
    const [[{ totalCount }]] = (await this.pool.query(
      `SELECT FOUND_ROWS() AS totalCount`,
    )) as any[][];

    return {
      totalCount,
      data: result,
    };
  }

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
