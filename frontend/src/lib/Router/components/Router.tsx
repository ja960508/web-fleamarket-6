import React from 'react';
import PathProvider from './PathProvider';

function Router({ children }: { children: React.ReactNode }) {
  return <PathProvider>{children}</PathProvider>;
}

export default Router;
