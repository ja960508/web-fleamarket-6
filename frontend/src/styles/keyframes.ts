import { keyframes } from 'styled-components';

export const BannerAnimation = keyframes`
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  75% {
    opcity: 0.75;
  }

  100% {
    opacity: 0.5;
  }
`;

export const AppearFromBottom = keyframes`
  from {
    transform: translateY(15px);
    opacity: 0.5;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const AppearFromTop = keyframes`
  from {
    transform: translateY(95%);
    opacity: 0.1;
  }

  to {
    transform: translateY(110%);
    opacity: 1;
  }
`;

export const spinAnimation = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(1turn);
}`;