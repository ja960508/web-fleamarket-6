import { MouseEvent } from 'react';
import { useNavigate } from '../hooks';
import { NextPathType } from './PathProvider';

interface LinkProps {
  className?: string;
  children: React.ReactNode;
  to: NextPathType;
  state?: any;
}

function Link({ className, children, to, state }: LinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to, state);
  };

  return (
    <a className={className} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
