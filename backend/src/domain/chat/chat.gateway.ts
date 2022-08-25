import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer()
  server: Server;

  public handleConnection(client: Socket) {
    console.log('웹소켓이 연결되었음...');
    console.log(client.id + '가 접속했어요.');
    client.leave(client.id);
  }

  public handleDisconnect(client: Socket) {
    console.log('웹소켓 연결 종료되었음');
    console.log(client.id + '가 떠났어요.');

    console.log('-----------------------------------');
    client.leave(client.data.roomId);
  }
}
