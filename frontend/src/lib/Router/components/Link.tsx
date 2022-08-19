import { MouseEvent } from 'react';
import { useNavigate } from '../hooks';

interface LinkProps {
  className?: string;
  children: React.ReactNode;
  to: string;
}

function Link({ className, children, to }: LinkProps) {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a className={className} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
