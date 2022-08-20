import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';
import { MySQLModule } from 'src/config/mysql.module';

@Module({
  imports: [HttpModule, MySQLModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
