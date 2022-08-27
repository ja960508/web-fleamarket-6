import { keyframes } from 'styled-components';

export const appearFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  90% {
    transform: translateX(5%);
  }

  100% {
    transform: translate(0);
  }
`;

export const disappearWithOpacity = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.9;
  }

  100% {
    opacity: 0;
  }
`;
