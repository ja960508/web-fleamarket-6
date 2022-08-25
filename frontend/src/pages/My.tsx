import { useContext } from 'react';
import styled from 'styled-components';
import ChatRoomList from '../components/My/ChatRoomList';
import MyLikePostList from '../components/My/MyLikePostList';
import MyPostList from '../components/My/MyPostList';
import PageHeader from '../components/PageHeader/PageHeader';
import { UserInfoDispatch } from '../context/UserInfoContext';
import useMyPage from '../hooks/useMyPage';
import { credentialRemote } from '../lib/api';
import { useNavigate } from '../lib/Router';
import colors from '../styles/colors';
import { textSmall } from '../styles/fonts';

const TABS = ['판매목록', '채팅', '관심목록'];

function My() {
  const dispatch = useContext(UserInfoDispatch);
  const navigate = useNavigate();
  const {
    tab,
    selectedTab,
    products,
    chatRooms,
    isSelectChatRooms,
    isSelectPostLike,
  } = useMyPage();

  const handleLogout = async () => {
    await credentialRemote.get('auth/logout');
    dispatch({ type: 'USERINFO/DELETE_USER' });

    navigate('/');
  };

  return (
    <>
      <PageHeader
        pageName="마이페이지"
        extraButton={<button onClick={handleLogout}>로그아웃</button>}
      />
      <StyledMyPageTabs>
        {TABS.map((item) => (
          <li
            key={item}
            className={tab === item ? 'selected' : ''}
            onClick={() => selectedTab(item)}
          >
            {item}
          </li>
        ))}
      </StyledMyPageTabs>
      <ul>
        {isSelectChatRooms ? (
          <ChatRoomList chatRooms={chatRooms} />
        ) : isSelectPostLike ? (
          <MyLikePostList products={products} />
        ) : (
          <MyPostList products={products} />
        )}
      </ul>
    </>
  );
}

export default My;

const StyledMyPageTabs = styled.ul`
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
  background-color: ${colors.offWhite};

  li {
    padding: 0 0.5rem 1rem 0.5rem;
  }

  .selected {
    color: ${colors.primary};
    border-bottom: 2px solid ${colors.primary};
  }
`;

export const StyledGuideMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  ${textSmall};
  color: ${colors.gray200};
`;
