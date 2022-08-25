import { useState } from 'react';
import ChatRoomList from '../components/My/ChatRoomList';
import MyLikePostList from '../components/My/MyLikePostList';
import MyPostList from '../components/My/MyPostList';
import TABS from '../constants/tabs';

function useMyPage() {
  const [tab, selectedTab] = useState(TABS[0]);

  const getTabContents = () => {
    switch (tab) {
      case '판매목록':
        return <MyPostList />;
      case '채팅':
        return <ChatRoomList />;
      case '관심목록':
        return <MyLikePostList />;
      default:
        return <MyPostList />;
    }
  };

  return {
    tab,
    selectedTab,
    getTabContents,
  };
}

export default useMyPage;
