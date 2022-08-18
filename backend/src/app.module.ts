import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MySQLModule } from './config/mysql.module';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MySQLModule,
    UserModule,
  ],
})
export class AppModule {}
