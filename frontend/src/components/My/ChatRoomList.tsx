import React, { useState } from 'react';
import { StyledGuideMessage } from '../../pages/My';

function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState<string[]>([]);
  const isNotEmpty = chatRooms.length;

  return isNotEmpty ? (
    <ul>
      {chatRooms.map((item) => (
        <li key={item}>채팅</li>
      ))}
    </ul>
  ) : (
    <StyledGuideMessage>채팅 기록이 없습니다.</StyledGuideMessage>
  );
}

export default ChatRoomList;
