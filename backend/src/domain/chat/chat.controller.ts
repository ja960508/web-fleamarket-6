import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // 방 생성
  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createRoom(createChatDto);
  }

  // 채팅목록을 처리하는 친구
  // 쿼리를 받음. 내가 참여중인것 or 현재 상품에 대한 것
  @Get()
  getChatRooms() {
    return '어떤 채팅방 목록';
  }

  @Get(':roomId')
  getChatMessageByRoomId() {
    return '특정 방에 대한 채팅내역';
  }

  // 메시지 전송하기
  @Post(':roomId')
  sendChatMessage() {
    return '특정 방에 대한 채팅내역';
  }

  // 방 나가기 -> 채팅 종료하기
  @Delete(':roomId')
  remove(@Param('roomId') roomId: number) {
    return this.chatService.removeRoomById(roomId);
  }
}
