import { useContext } from 'react';
import { PathContext, PathDispatch } from './components/PathProvider';
import location from './location';

export function usePathParams() {
  const currentPath = useContext(PathContext);
  const { path, params } = location.getLocation();
  const paramsRegex = new RegExp(`^${path}$`);

  const match = currentPath.match(paramsRegex);

  if (!match) {
    return {};
  }

  match.shift();

  const result: {
    [key: string]: string;
  } = {};

  return match.reduce(
    (result, curr, idx) => {
      console.log(curr);
      result[params[idx]] = curr;

      return result;
    },
    { ...result },
  );
}

export function useNavigate(path: string) {
  const pathDispatch = useContext(PathDispatch);

  pathDispatch(path);
}

export function useSearchParams() {
  const currentPath = useContext(PathContext);
  const location = new URLSearchParams(currentPath);

  return (query: string) => {
    return location.get(query);
  };
}
