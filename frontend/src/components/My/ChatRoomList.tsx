import React from 'react';

function ChatRoomList({ chatRooms }: { chatRooms: string[] }) {
  const isNotEmpty = chatRooms.length;

  return isNotEmpty ? (
    <ul>
      {chatRooms.map((item) => (
        <li key={item}>채팅</li>
      ))}
    </ul>
  ) : (
    <div>채팅 기록이 없습니다.</div>
  );
}

export default ChatRoomList;
