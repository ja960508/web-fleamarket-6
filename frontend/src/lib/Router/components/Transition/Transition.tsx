import styled, { css, keyframes } from 'styled-components';
import { PropsWithChildren } from 'react';
import useTransitionHelper, { RouteInfo } from './useTransitionHelper';

function Transition({ children }: PropsWithChildren): JSX.Element {
  const { isAnimationReady, currentRoute, nextRoute, handleAnimationEnd } =
    useTransitionHelper({
      currentChildren: children,
    });

  const renderRouteElement = (route: RouteInfo) => {
    return route?.element ?? null;
  };

  return (
    <StyledAnimatingBox
      isAnimating={isAnimationReady}
      onAnimationEnd={handleAnimationEnd}
    >
      <Wrapper key={currentRoute.locationInfo?.pathname}>
        {renderRouteElement(currentRoute)}
      </Wrapper>
      {isAnimationReady && <Wrapper>{renderRouteElement(nextRoute)}</Wrapper>}
    </StyledAnimatingBox>
  );
}

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

const routeKeyframes = {
  right: keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  `,
  left: keyframes`
  0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }`,
};

const StyledAnimatingBox = styled.div<{ isAnimating?: boolean }>`
  ${({ isAnimating }) =>
    isAnimating &&
    css`
      display: flex;
      animation: ${routeKeyframes.right} ease-in-out 0.5s forwards;
    `};
`;

export default Transition;
