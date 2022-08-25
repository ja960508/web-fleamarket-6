import { useEffect, useMemo, useRef } from 'react';
import * as io from 'socket.io-client';
import socketEvent from '../constants/socketEvent';

function useSocket(roomId: string) {
  const socket = useRef<io.Socket<any, any>>();
  useEffect(() => {
    socket.current = io.connect('http://localhost:8080');

    socket.current.on('connect', () => {
      socket.current?.emit(socketEvent.ENTER, {
        seller: 1,
        buyer: 5,
        roomId,
      });
    });
  }, []);

  const sendMessage = (message: string) => {
    if (!socket.current) return;

    socket.current?.emit(socketEvent.SEND, { message, senderId: 5 });
  };

  return { sendMessage };
}

export default useSocket;
