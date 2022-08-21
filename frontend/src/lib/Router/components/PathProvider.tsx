import { createContext, useEffect, useState } from 'react';

export type NextPathType = string | -1;
type PathDispatchType = (nextPath: NextPathType, state?: any) => void;

export const PathContext = createContext('/');
export const PathDispatch = createContext<PathDispatchType>(() => undefined);

function PathProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(location.pathname);

  const handlePathChange = (nextPath: NextPathType, state?: any) => {
    if (nextPath === -1) {
      window.history.back();
      return;
    }

    setPath(nextPath);
    window.history.pushState(state, '', nextPath);
  };

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <PathContext.Provider value={path}>
      <PathDispatch.Provider value={handlePathChange}>
        {children}
      </PathDispatch.Provider>
    </PathContext.Provider>
  );
}

export default PathProvider;
