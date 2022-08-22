import React, { Children, useContext } from 'react';
import { PathContext } from './PathProvider';
import {
  isMatchedRoute,
  isValidChild,
  removeQueryString,
  throwError,
  transformPathVariables,
} from '../utils';
import location from '../location';

function Routes({
  children,
  pathnameProps,
}: {
  pathnameProps?: string;
  children: React.ReactNode;
}) {
  const path = useContext(PathContext);
  const currentPath = pathnameProps || path;

  let currentRoute = null;

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
      currentRoute = routeElement;
      location.setLocation({
        path: parsedPath,
        params,
      });
    }
  });

  return <>{currentRoute}</>;
}

export default Routes;
