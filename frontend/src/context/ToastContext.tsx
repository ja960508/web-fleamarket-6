import { createContext, PropsWithChildren, useReducer } from 'react';
import type { Dispatch } from 'react';

export type ToastContentType = JSX.Element | string;
export type ToastCssType = 'notice' | 'warn' | 'error';
type ToastActionType = 'add' | 'clear';

export interface ToastContextInfo {
  toastCssType: ToastCssType;
  toastContent: ToastContentType;
}

interface ToastAction {
  type: ToastActionType;
  payload?: ToastContextInfo;
}

const initialToastList: ToastContextInfo[] = [];

export const ToastContext = {
  data: createContext<ToastContextInfo[]>(initialToastList),
  dispatch: createContext<Dispatch<ToastAction>>(() => undefined),
};

function toastReducer(state: ToastContextInfo[], action: ToastAction) {
  switch (action.type) {
    case 'add':
      if (!action.payload) return state;
      return [...state, action.payload];
    case 'clear':
    default:
      return [...initialToastList];
  }
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [toastList, toastListDispatch] = useReducer(
    toastReducer,
    initialToastList,
  );

  return (
    <ToastContext.data.Provider value={toastList}>
      <ToastContext.dispatch.Provider value={toastListDispatch}>
        {children}
      </ToastContext.dispatch.Provider>
    </ToastContext.data.Provider>
  );
}
