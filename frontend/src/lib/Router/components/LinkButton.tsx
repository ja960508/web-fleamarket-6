import { useNavigate } from '../hooks';
import { NextPathType } from './PathProvider';

interface LinkButtonProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
  moveTo: NextPathType;
  state?: any;
}

function LinkButton({ className, children, moveTo, state }: LinkButtonProps) {
  const navigate = useNavigate();

  const handleLinkButtonClick = () => {
    navigate(moveTo, state);
  };

  return (
    <button
      style={{ display: 'flex' }}
      className={className}
      onClick={handleLinkButtonClick}
    >
      {children}
    </button>
  );
}

export default LinkButton;
