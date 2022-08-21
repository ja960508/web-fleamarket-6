import { HttpException, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { MySQLService } from 'src/config/mysql/mysql.service';
import { S3Service } from 'src/config/s3/s3.service';
import { ProductsGetOptions } from './types/product';

@Injectable()
export class ProductService {
  pool: Pool;
  constructor(
    private readonly awsS3Service: S3Service,
    private readonly mysqlService: MySQLService,
  ) {
    this.pool = mysqlService.pool;
  }

  async getProductById(productId: number) {
    return 1234;
  }

  async getProducts(options: ProductsGetOptions) {
    const { userId, filter, categoryId, page = 1 } = options;

    const LIMIT = 10;
    const CALC_TOTAL_COUNT = `SQL_CALC_FOUND_ROWS`;
    const REGION_SUBQUERY = /*sql*/ `(SELECT name from USER JOIN REGION ON USER.regionId = REGION.id where USER.id = authorId) as regionName`;
    const ISLIKED_SUBQUERY = /*sql*/ `EXISTS (SELECT * FROM USER_LIKE_PRODUCT where userId = ${
      userId ?? -1
    } and productId = PRODUCT.id) as isLiked`;
    const ISLIKED_TRUE = /*sql*/ `(SELECT 1) AS isLiked`;
    const SELECT_WITH = `${CALC_TOTAL_COUNT} ${REGION_SUBQUERY},`;

    if (filter && categoryId) {
      throw new HttpException(
        'Filter cannot be provided with category option. Choose one.',
        400,
      );
    }

    if (!userId && filter) {
      throw new HttpException('filter should be provided with userId.', 400);
    }

    let beforePaginationQuery = /*sql*/ `SELECT ${SELECT_WITH} ${ISLIKED_SUBQUERY}, PRODUCT.* FROM PRODUCT`;

    if (filter === 'like') {
      beforePaginationQuery = /*sql*/ `
          SELECT ${SELECT_WITH} P.*, ${ISLIKED_TRUE} FROM PRODUCT AS P INNER JOIN USER_LIKE_PRODUCT AS ULP ON ULP.productId = P.id WHERE ULP.userId = ${userId}
        `;
    }

    if (filter === 'sale') {
      beforePaginationQuery = /*sql*/ `
          SELECT ${SELECT_WITH} ${ISLIKED_SUBQUERY}, PRODUCT.* FROM PRODUCT WHERE authorId = ${userId}
        `;
    }

    if (categoryId) {
      beforePaginationQuery = /*sql*/ `
        SELECT ${SELECT_WITH} ${ISLIKED_SUBQUERY}, PRODUCT.* FROM PRODUCT WHERE categoryId = ${categoryId}
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
