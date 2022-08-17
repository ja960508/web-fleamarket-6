import { MouseEvent, useContext } from 'react';
import { PathDispatch } from './PathProvider';

interface LinkProps {
  className?: string;
  children: React.ReactNode;
  to: string;
}

function Link({ className, children, to }: LinkProps) {
  const pathDispatch = useContext(PathDispatch);

  const handleClick = ({ preventDefault }: MouseEvent<HTMLAnchorElement>) => {
    preventDefault();
    pathDispatch(to);
  };

  return (
    <a className={className} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
