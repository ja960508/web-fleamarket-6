import { useEffect, useRef, useState } from 'react';
import * as io from 'socket.io-client';
import socketEvent from '../constants/socketEvent';
import { ChatRoomInfo } from '../types/chat';

interface ReceivedData {
  senderId: number;
  message: string;
  timestamp: string;
}

function useSocket(roomInfo?: ChatRoomInfo['roomInfo']) {
  const [isLoading, setIsLoading] = useState(true);
  const [receivedData, setReceivedData] = useState<ReceivedData[]>([]);
  const socket = useRef<io.Socket>();

  const sendMessage = ({
    message,
    senderId,
  }: {
    message: string;
    senderId: number;
  }) => {
    if (!socket.current) return;

    socket.current?.emit(socketEvent.SEND, { message, senderId });
  };

  const receiveMessage = (socket: io.Socket) => {
    socket.on(socketEvent.RECEIVE, (info: ReceivedData) => {
      setReceivedData((prev) => [...prev, info]);
    });
  };

  useEffect(() => {
    socket.current = io.connect('http://localhost:8080');
  }, []);

  useEffect(() => {
    if (!socket?.current || !roomInfo) return;

    const { authorId: sellerId, buyerId, id: roomId } = roomInfo;
    socket.current.emit(socketEvent.ENTER, {
      sellerId,
      buyerId,
      roomId,
    });
    setIsLoading(false);

    receiveMessage(socket.current);
  }, [roomInfo]);

  return { isLoading, sendMessage, receivedData };
}

export default useSocket;
