import { createContext, useEffect, useState } from 'react';

type PathDispatchType = (nextPath: string) => void;

export const PathContext = createContext('/');
export const PathDispatch = createContext<PathDispatchType>(() => undefined);

function PathProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(location.pathname);

  const handlePathChange = (nextPath: string) => {
    setPath(nextPath);
    window.history.pushState(nextPath, '', nextPath);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setPath(event.state);
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
