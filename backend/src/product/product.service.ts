import { HttpException, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';
import { MySQLService } from 'src/config/mysql/mysql.service';
import { S3Service } from 'src/config/s3/s3.service';
import {
  ProductLikeRequestBody,
  ProductParam,
  ProductsGetOptions,
} from './types/product';

@Injectable()
export class ProductService {
  pool: Pool;
  constructor(
    private readonly awsS3Service: S3Service,
    private readonly mysqlService: MySQLService,
  ) {
    this.pool = mysqlService.pool;
  }

  private async isProductExist(productId: number) {
    const [result] = await this.pool.query(/*sql*/ `
      SELECT 1 FROM PRODUCT WHERE PRODUCT.id = ${productId} LIMIT 1;
    `);

    return Boolean(result[0]);
  }

  async getProductById(productId: number) {
    const isExist = await this.isProductExist(productId);
    if (!isExist) {
      throw new HttpException(`Cannot found Product.`, 404);
    }

    const [result] = await this.pool.query(/*sql*/ `
      SELECT P.*, UR.nickname as authorName, COUNT(ULP.id) as likeCount, C.name as categoryName, regionName
      FROM PRODUCT as P
      INNER JOIN CATEGORY as C ON C.id = P.categoryId
      INNER JOIN (SELECT U.nickname, U.id, R.name as regionName FROM USER as U INNER JOIN REGION as R) AS UR ON P.authorId = UR.id
      LEFT JOIN USER_LIKE_PRODUCT as ULP ON ULP.productId = P.id
      where P.id = ${productId};
    `);

    return result[0];
  }

  async getProducts(options: ProductsGetOptions) {
    const { userId, filter, categoryId, page = 1 } = options;

    const LIMIT = 10;
    const CALC_TOTAL_COUNT = `SQL_CALC_FOUND_ROWS`;
    const REGION_SUBQUERY = /*sql*/ `(SELECT name from USER JOIN REGION ON USER.regionId = REGION.id where USER.id = authorId) as regionName`;
    const ISLIKED_SUBQUERY = /*sql*/ `EXISTS (SELECT * FROM USER_LIKE_PRODUCT where userId = ${
      userId ?? -1
    } and productId = P.id) as isLiked`;
    const LIKECOUNT_SUBQUERY = /*sql*/ `(SELECT COUNT(1) FROM USER_LIKE_PRODUCT as ULP WHERE ULP.productId = P.id) as likeCount`;
    const ISLIKED_TRUE = /*sql*/ `(SELECT 1) AS isLiked`;

    const SELECT_WITH = `DISTINCT ${CALC_TOTAL_COUNT} ${REGION_SUBQUERY}, ${LIKECOUNT_SUBQUERY},`;
    const BASE_TABLE = /*sql*/ `PRODUCT as P LEFT JOIN USER_LIKE_PRODUCT as ULP ON ULP.productId = P.id`;

    if (filter && categoryId) {
      throw new HttpException(
        'Filter cannot be provided with category option. Choose one.',
        400,
      );
    }

    if (!userId && filter) {
      throw new HttpException('filter should be provided with userId.', 400);
    }

    let beforePaginationQuery = /*sql*/ `SELECT ${SELECT_WITH} ${ISLIKED_SUBQUERY}, P.* FROM ${BASE_TABLE}`;

    if (filter === 'like') {
      beforePaginationQuery = /*sql*/ `
        SELECT ${SELECT_WITH} P.*, ${ISLIKED_TRUE} FROM ${BASE_TABLE} WHERE ULP.userId = ${userId}
      `;
    }

    if (filter === 'sale') {
      beforePaginationQuery = /*sql*/ `
        SELECT ${SELECT_WITH} ${ISLIKED_SUBQUERY}, P.* FROM ${BASE_TABLE} WHERE P.authorId = ${userId}
      `;
    }

    if (categoryId) {
      beforePaginationQuery = /*sql*/ `
        SELECT ${SELECT_WITH} ${ISLIKED_SUBQUERY}, P.* FROM ${BASE_TABLE} WHERE P.categoryId = ${categoryId}
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

  async likeOrDislikeProduct(options: ProductLikeRequestBody & ProductParam) {
    const { userId, productId, isLiked: targetIsLiked } = options;

    if (!targetIsLiked) {
      await this.pool.query(/*sql*/ `
        DELETE FROM USER_LIKE_PRODUCT WHERE userId = ${userId} and productId = ${productId};
      `);
    } else {
      await this.pool.query(/*sql*/ `
        INSERT INTO USER_LIKE_PRODUCT (userId, productId)
        SELECT ${userId}, ${productId} FROM dual WHERE NOT EXISTS
        (SELECT 1 FROM USER_LIKE_PRODUCT WHERE userId = ${userId} and productId = ${productId});
      `);
    }

    return {
      isLiked: targetIsLiked,
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
