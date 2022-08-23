import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MySQLModule } from './config/mysql/mysql.module';
import { AuthModule } from './domain/auth/auth.module';
import { ProductModule } from './domain/product/product.module';
import { S3Module } from './config/s3/s3.module';
import { CategoryModule } from './domain/category/category.module';
import { RegionModule } from './domain/region/region.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MySQLModule,
    AuthModule,
    ProductModule,
    S3Module,
    CategoryModule,
    RegionModule,
  ],
})
export class AppModule {}
