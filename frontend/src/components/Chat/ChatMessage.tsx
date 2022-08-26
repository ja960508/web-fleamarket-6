import styled from 'styled-components';
import colors from '../../styles/colors';
import { MessageType } from '../../types/chat';

interface ChatMessageProps {
  chatMessage: MessageType;
  isMine: boolean;
}

function ChatMessage({ chatMessage, isMine }: ChatMessageProps) {
  console.log(isMine);
  return (
    <StyledChatMessage isMine={isMine}>{chatMessage.message}</StyledChatMessage>
  );
}

export default ChatMessage;

const StyledChatMessage = styled.li<{ isMine: boolean }>`
  padding: 0.5rem;
  align-self: ${({ isMine }) => (isMine ? 'end' : 'start')};
  color: ${({ isMine }) => (isMine ? colors.white : colors.black)};
  background-color: ${({ isMine }) => (isMine ? colors.primary : colors.white)};
  border: ${({ isMine }) => (isMine ? `none` : `1px solid ${colors.primary}`)};
  border-radius: ${({ isMine }) =>
    isMine
      ? `8px 0px 8px 8px`
      : `0px 8px 8px 8px;
  `};
  margin-bottom: 1rem;
`;
