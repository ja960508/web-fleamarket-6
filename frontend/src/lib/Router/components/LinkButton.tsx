import { useNavigate } from '../hooks';

interface LinkButtonProps {
  className?: string;
  children: React.ReactNode;
  moveTo: string;
  state?: any;
}

function LinkButton({ className, children, moveTo, state }: LinkButtonProps) {
  const navigate = useNavigate();

  const handleLinkButtonClick = () => {
    navigate(moveTo, state);
  };

  return (
    <button className={className} onClick={handleLinkButtonClick}>
      {children}
    </button>
  );
}

export default LinkButton;
