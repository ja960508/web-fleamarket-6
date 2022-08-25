import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MySQLModule } from 'src/config/mysql/mysql.module';

@Module({
  imports: [MySQLModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
