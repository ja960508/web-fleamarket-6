import { PropsWithChildren } from 'react';
import styled from 'styled-components';

function ChatList({ children }: PropsWithChildren) {
  return <StyledChatList>{children}</StyledChatList>;
}

export default ChatList;

const StyledChatList = styled.ol`
  flex: 1 1 100%;
`;
