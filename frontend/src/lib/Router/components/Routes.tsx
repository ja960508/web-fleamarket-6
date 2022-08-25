import React, {
  Children,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import { PathContext } from './PathProvider';
import {
  getPathParams,
  isMatchedRoute,
  isValidChild,
  removeQueryString,
  throwError,
  transformPathVariables,
} from '../utils';
import { LocationDispatch, LocationInfo } from './LocationProvider';

function Routes({
  children,
  locationInfo,
}: PropsWithChildren<{
  locationInfo?: {
    pathname: string;
    search: string;
  };
}>) {
  const path = useContext(PathContext);
  const changeLocation = useContext(LocationDispatch);
  const currentPath = locationInfo?.pathname || path;

  const nextLocation = useRef<LocationInfo>();
  const currentRoute = useRef(null);

  Children.forEach(children, (child: React.ReactNode) => {
    if (!isValidChild(child)) {
      throwError('올바른 Route 컴포넌트가 아닙니다.');
      return;
    }

    const { path: routePath, element: routeElement } = child.props;

    const { parsedPath, params } = transformPathVariables(
      removeQueryString(routePath),
    );

    if (isMatchedRoute(parsedPath, removeQueryString(currentPath))) {
      currentRoute.current = routeElement;

      const resultParam = getPathParams({
        currentPath,
        pathRegex: parsedPath,
        paramArray: params,
      });

      nextLocation.current = {
        pathname: currentPath,
        params: resultParam,
        search: locationInfo?.search || '',
      };
    }
  });
  useLayoutEffect(() => {
    if (nextLocation.current) {
      changeLocation(nextLocation.current);
    }
  }, []);

  return <>{currentRoute.current}</>;
}

export default Routes;
