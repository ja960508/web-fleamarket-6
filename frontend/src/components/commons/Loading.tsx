import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';
import colors from '../../styles/colors';

const Loading = forwardRef<HTMLDivElement>((_props, ref) => {
  return <LoadingSpinner ref={ref} />;
});

Loading.displayName = 'loading';

export default Loading;

const spinAnimation = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(1turn);
}`;

export const LoadingSpinner = styled.div`
  padding: 1rem;
  width: 2rem;
  height: 2rem;
  margin: 0.75rem auto;
  border-radius: 50%;
  border: 0.25rem solid ${colors.gray300};
  border-top-color: ${colors.primary};
  animation: ${spinAnimation} 0.8s linear infinite;
`;
