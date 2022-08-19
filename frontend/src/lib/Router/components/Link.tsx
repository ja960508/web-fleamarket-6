import { MouseEvent } from 'react';
import { useNavigate } from '../hooks';

interface LinkProps {
  className?: string;
  children: React.ReactNode;
  to: string;
  state?: any;
}

function Link({ className, children, to, state }: LinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to, state);
  };

  return (
    <a className={className} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
