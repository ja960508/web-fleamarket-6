import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import UserInfoProvider from './context/UserInfoContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ToastProvider>
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </ToastProvider>,
);
