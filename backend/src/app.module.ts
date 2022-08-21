import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MySQLModule } from './config/mysql/mysql.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { S3Module } from './config/s3/s3.module';
import { CategoryModule } from './category/category.module';

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
  ],
})
export class AppModule {}
