import { useNavigate } from '../hooks';

interface LinkButtonProps {
  className?: string;
  children: React.ReactNode;
  moveTo: string;
}

function LinkButton({ className, children, moveTo }: LinkButtonProps) {
  const navigate = useNavigate();

  const handleLinkButtonClick = () => {
    navigate(moveTo);
  };

  return (
    <button className={className} onClick={handleLinkButtonClick}>
      {children}
    </button>
  );
}

export default LinkButton;
