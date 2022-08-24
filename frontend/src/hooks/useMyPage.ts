import { useEffect, useState } from 'react';
import useGetProducts from './useGetProducts';

const TABS = ['판매목록', '채팅', '관심목록'];

function useMyPage() {
  const [tab, selectedTab] = useState(TABS[0]);
  const [chatRooms, setChatRooms] = useState<string[]>([]);
  const { products, getProductsByUserId, getProductsByUserLike } =
    useGetProducts();
  const isSelectPostLike = tab === TABS[2];
  const isSelectChatRooms = tab === TABS[1];

  useEffect(() => {
    switch (tab) {
      case '판매목록':
        getProductsByUserId();
        break;
      case '채팅':
        setChatRooms([]);
        break;
      case '관심목록':
        getProductsByUserLike();
        break;
      default:
        getProductsByUserId();
        break;
    }
  }, [getProductsByUserId, getProductsByUserLike, tab]);

  return {
    tab,
    selectedTab,
    products,
    chatRooms,
    isSelectChatRooms,
    isSelectPostLike,
  };
}

export default useMyPage;
