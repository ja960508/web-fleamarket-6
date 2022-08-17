import React, { Children, useContext } from 'react';
import { PathContext } from './PathProvider';
import {
  isMatchedRoute,
  isValidChild,
  removeQueryString,
  throwError,
  transformPathVariables,
} from '../utils';

function Routes({ children }: { children: React.ReactNode }) {
  const path = useContext(PathContext);

  let currentRoute = null;
  let _currentParams = null;

  Children.forEach(children, (child: React.ReactNode) => {
    if (!isValidChild(child)) {
      throwError('올바른 Route 컴포넌트가 아닙니다.');
      return;
    }

    const { path: routePath, element: routeElement } = child.props;

    const { parsedPath, params } = transformPathVariables(
      removeQueryString(routePath),
    );

    if (isMatchedRoute(parsedPath, path)) {
      currentRoute = routeElement;
      _currentParams = params;
    }
  });

  return currentRoute;
}

export default Routes;
