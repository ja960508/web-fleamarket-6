import styled from 'styled-components';
import useChatRooms from '../../hooks/useChatRooms';
import { StyledGuideMessage } from '../../pages/My';
import colors from '../../styles/colors';

function ChatRoomList() {
  const { chatRooms } = useChatRooms();

  const isNotEmpty = chatRooms?.length;

  return isNotEmpty ? (
    <ul>
      {chatRooms?.map((item) => (
        <StyledChatList key={item.id}>
          <div className="your-info">
            <div className="your-name">{item.buyerName || item.sellerName}</div>
            <div className="last-message">{item.lastChatMessage}</div>
          </div>
          <div>
            <img src={item.thumbnails[0]} alt="product_thumbnail" />
          </div>
        </StyledChatList>
      ))}
    </ul>
  ) : (
    <StyledGuideMessage>채팅 기록이 없습니다.</StyledGuideMessage>
  );
}

export default ChatRoomList;

const StyledChatList = styled.li`
  padding: 1rem;
  border-bottom: 1px solid ${colors.gray300};
  display: flex;

  .your-info {
    flex: 1;
  }
`;
