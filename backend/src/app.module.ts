import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MySQLModule } from './config/mysql.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MySQLModule,
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
