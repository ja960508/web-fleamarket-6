import styled from 'styled-components';
import {
  ReactNode,
  useState,
  useEffect,
  useRef,
  cloneElement,
  useContext,
  PropsWithChildren,
  isValidElement,
} from 'react';
import { PathContext } from './PathProvider';

function cloneChildren(children: ReactNode, pathnameProps?: string) {
  const cloneTarget = isValidElement(children) ? children : <>{children}</>;
  return cloneElement(cloneTarget, { pathnameProps });
}

interface RouteInfo {
  element?: JSX.Element;
  pathnameProps?: string;
}

function Animating({ children }: PropsWithChildren): JSX.Element {
  const path = useContext(PathContext);
  const mountRef = useRef(false);
  const [currentRoute, setCurrentRoute] = useState<RouteInfo>({
    element: cloneChildren(children, location.pathname),
    pathnameProps: location.pathname,
  });
  const [nextRoute, setNextRoute] = useState<RouteInfo>({});
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  const isMount = mountRef.current !== false;

  const handleAnimationEnd = () => {
    setIsAnimationReady(false);
  };

  useEffect(() => {
    if (!isMount) {
      return;
    }

    setNextRoute({
      element: cloneChildren(children, location.pathname),
      pathnameProps: location.pathname,
    });

    setIsAnimationReady(true);
  }, [children, path]);

  useEffect(() => {
    if (isMount && !isAnimationReady) {
      const { element, pathnameProps } = nextRoute;
      setCurrentRoute({
        element: cloneChildren(element, pathnameProps),
        pathnameProps: nextRoute.pathnameProps,
      });
    }
  }, [isAnimationReady]);

  useEffect(() => {
    mountRef.current = true;
  }, []);

  if (!isAnimationReady) {
    return <>{currentRoute?.element ?? null}</>;
  }

  return (
    <StyledAnimatingBox onAnimationEnd={handleAnimationEnd}>
      <Wrapper>{currentRoute?.element ?? null}</Wrapper>
      <Wrapper>{nextRoute?.element ?? null}</Wrapper>
    </StyledAnimatingBox>
  );
}

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

const StyledAnimatingBox = styled.div`
  display: flex;
  @keyframes moveToLeft {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  animation: moveToLeft ease-in-out 0.7s forwards;
`;

export default Animating;
