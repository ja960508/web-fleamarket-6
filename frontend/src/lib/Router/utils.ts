import React, { isValidElement } from 'react';

const ROUTE_PARAMETER_REGEX = /:(\w+)/g;
const QUERY_STRING_REGEXP = /\?[\w=&]+/g;
const URL_FRAGMENT = '([^\\/]+)';

export function throwError(message: string) {
  throw new Error(message);
}

export function isRouteComponent(element: React.ReactElement) {
  return element.props.path && element.props.element;
}

export function isValidChild(
  child: React.ReactNode,
): child is React.ReactElement {
  if (!isValidElement(child)) {
    return false;
  }

  if (!isRouteComponent(child)) {
    return false;
  }

  return true;
}

export function removeQueryString(routePath: string) {
  return routePath.replace(QUERY_STRING_REGEXP, '');
}

export function transformPathVariables(routePath: string) {
  const params: string[] = [];
  const parsedPath = routePath.replace(
    ROUTE_PARAMETER_REGEX,
    (_match: string, paramName: string) => {
      params.push(paramName);
      return URL_FRAGMENT;
    },
  );

  return {
    parsedPath,
    params,
  };
}

export function isMatchedRoute(parsedPath: string, pathname: string) {
  const pathRegExp = new RegExp(`^${parsedPath}$`);

  return pathRegExp.test(pathname);
}
