import { HttpException, Injectable } from '@nestjs/common';
import { Pool, ResultSetHeader } from 'mysql2/promise';
import { MySQLService } from 'src/config/mysql/mysql.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  pool: Pool;
  constructor(private readonly mysqlService: MySQLService) {
    this.pool = mysqlService.pool;
  }

  async isRoomExist(roomId: number) {
    const [result] = await this.pool.query(/*sql*/ `
      SELECT 1 FROM CHATROOM WHERE CHATROOM.id = ${roomId} AND CHATROOM.deletedAt IS NULL LIMIT 1;
    `);

    return Boolean(result[0]);
  }

  async createRoom(createChatDto: CreateChatDto) {
    const keyTemplate = Object.keys(createChatDto)
      .map((key) => key)
      .join();

    const valueTemplate = Object.values(createChatDto)
      .map((value) => value)
      .join();

    const [res] = await this.pool.query(`
      INSERT INTO CHATROOM (${keyTemplate})
      VALUES (${valueTemplate})
    `);

    const { insertId } = res as ResultSetHeader;

    return {
      roomId: insertId,
    };
  }

  async removeRoomById(roomId: number) {
    const isExist = await this.isRoomExist(roomId);
    if (!isExist) {
      throw new HttpException('Room not found.', 404);
    }

    const deletedAt = new Date().toISOString();

    const [res] = await this.pool.query(/*sql*/ `
      UPDATE CHATROOM SET deletedAt = "${deletedAt}" WHERE id = ${roomId}
    `);

    const modifedResult = res as ResultSetHeader;
    if (!modifedResult?.changedRows) {
      throw new HttpException('Nothing changed.', 422);
    }

    return {
      roomId,
    };
  }
}
