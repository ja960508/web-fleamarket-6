import styled, { keyframes } from 'styled-components';
import {
  ReactNode,
  useState,
  useEffect,
  useRef,
  cloneElement,
  PropsWithChildren,
  isValidElement,
  useContext,
} from 'react';
import { PathContext } from './PathProvider';

export function cloneChildren(
  children: ReactNode,
  locationInfo?: {
    search?: string;
    pathname?: string;
  },
) {
  const cloneTarget = isValidElement(children) ? children : <>{children}</>;
  return cloneElement(cloneTarget, {
    key: locationInfo?.pathname,
    locationInfo,
  });
}

interface RouteInfo {
  element?: JSX.Element;
  locationInfo?: {
    search?: string;
    pathname?: string;
  };
}

function Transition({ children }: PropsWithChildren): JSX.Element {
  const path = useContext(PathContext);
  const mountRef = useRef(false);
  const [currentRoute, setCurrentRoute] = useState<RouteInfo>({
    element: cloneChildren(children, {
      pathname: path,
      search: window.location.search,
    }),
    locationInfo: { pathname: path, search: window.location.search },
  });
  const [nextRoute, setNextRoute] = useState<RouteInfo>({});
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  const handleAnimationEnd = () => {
    setIsAnimationReady(false);
  };

  useEffect(() => {
    const isMount = mountRef.current !== false;
    if (!isMount) {
      return;
    }

    const locationInfo = {
      pathname: path,
      search: window.location.search,
    };

    setNextRoute({
      element: cloneChildren(children, locationInfo),
      locationInfo,
    });

    setIsAnimationReady(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [children, path]);

  useEffect(() => {
    const isMount = mountRef.current !== false;
    if (isMount && !isAnimationReady) {
      const { element, locationInfo } = nextRoute;
      setCurrentRoute({
        element: cloneChildren(element, locationInfo),
        locationInfo,
      });
    }
  }, [isAnimationReady, nextRoute]);

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

const StyledAnimatingBox = styled.div`
  display: flex;
  animation: ${routeKeyframes.right} ease-in-out 0.5s forwards;
`;

export default Transition;
