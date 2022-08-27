import { useContext } from 'react';
import {
  ToastContentType,
  ToastContext,
  ToastContextInfo,
  ToastCssType,
} from '../context/ToastContext';

function createToastContent(
  toastCssType: ToastCssType,
  toastContent: ToastContentType,
): ToastContextInfo {
  return {
    toastCssType,
    toastContent,
  };
}

function useToast() {
  const toastList = useContext(ToastContext.data);
  const toastDispatch = useContext(ToastContext.dispatch);

  const fire = (toastCssType: ToastCssType) => {
    return (toastContent: ToastContentType) => {
      toastDispatch({
        type: 'add',
        payload: createToastContent(toastCssType, toastContent),
      });
    };
  };

  const clear = () => {
    toastDispatch({
      type: 'clear',
    });
  };

  return {
    toastList,
    notice: fire('notice'),
    error: fire('error'),
    warn: fire('warn'),
    clear,
  };
}

export default useToast;
