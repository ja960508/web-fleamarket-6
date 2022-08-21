import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2';
import { Pool } from 'mysql2/promise';

@Injectable()
export class MySQLService implements OnModuleInit {
  pool: Pool;
  constructor(private configService: ConfigService) {
    this.pool = mysql
      .createPool({
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        user: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DATABASE'),
      })
      .promise();
  }

  async onModuleInit() {
    await this.pool.execute(`
    CREATE TABLE IF NOT EXISTS REGION (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(20) NOT NULL
    )
  `);

    await this.pool.execute(`
    INSERT INTO REGION (name)
    SELECT '잠실'
    WHERE NOT EXISTS (SELECT * FROM REGION)`);

    await this.pool.execute(`
    CREATE TABLE IF NOT EXISTS USER (
      id INT PRIMARY KEY AUTO_INCREMENT,
      githubUserId INT,
      nickname VARCHAR(20),
      password VARCHAR(20),
      regionId INT,
      FOREIGN KEY (regionId) REFERENCES REGION(id)
    )
    `);

    await this.pool.execute(`
    CREATE TABLE IF NOT EXISTS CATEGORY (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(20) NOT NULL,
      thumbnail VARCHAR(255)
    )
    `);

    await this.pool.execute(`
    CREATE TABLE IF NOT EXISTS PRODUCT (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(20) NOT NULL,
      price DECIMAL(10, 0) NOT NULL,
      createdAt TIMESTAMP NOT NULL,
      isSold TINYINT(1) NOT NULL,
      description VARCHAR(255) NOT NULL,
      viewCount int,
      thumbnails JSON,
      categoryId int,
      authorId int,
      FOREIGN KEY (categoryId) REFERENCES CATEGORY(id),
      FOREIGN KEY (authorId) REFERENCES USER(id)
    )
    `);

    await this.pool.execute(`
    CREATE TABLE IF NOT EXISTS USER_LIKE_PRODUCT (
      id INT PRIMARY KEY AUTO_INCREMENT,
      userId int NOT NULL,
      productId int NOT NULL,
      FOREIGN KEY (userId) REFERENCES USER(id),
      FOREIGN KEY (productId) REFERENCES PRODUCT(id)
    )
    `);

    await this.pool.execute(`
    CREATE TABLE IF NOT EXISTS USER_VIEW_PRODUCT (
      id INT PRIMARY KEY AUTO_INCREMENT,
      userId int NOT NULL,
      productId int NOT NULL,
      FOREIGN KEY (userId) REFERENCES USER(id),
      FOREIGN KEY (productId) REFERENCES PRODUCT(id)
    )
    `);
  }
}
