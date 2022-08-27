import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import { ToastCssType } from '../../../context/ToastContext';
import useToast from '../../../hooks/useToast';
import colors from '../../../styles/colors';

function ToastPortal({ children }: PropsWithChildren) {
  const toastElement = document.getElementById('toast');
  if (!toastElement) return <>{children}</>;

  return createPortal(children, toastElement);
}

function ToastContainer() {
  const { toastList } = useToast();
  return (
    <ToastPortal>
      <ToastBox>
        {toastList.map(({ toastContent, toastCssType }) => (
          <ToastContent type={toastCssType} key={toastContent + toastCssType}>
            {toastContent}
          </ToastContent>
        ))}
      </ToastBox>
    </ToastPortal>
  );
}

const ToastCss = {
  notice: css`
    background-color: ${colors.primary};
    color: ${colors.white};
  `,
  warn: css`
    background-color: ${colors.gray200};
    color: ${colors.white};
  `,
  error: css`
    background-color: ${colors.red};
    color: ${colors.white};
  `,
};

const ToastContent = styled.div<{ type: ToastCssType }>`
  ${({ type }) => ToastCss[type]};
`;

const ToastBox = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  width: 5rem;
  height: 2rem;
`;

export default ToastContainer;
