import ReactDOM from 'react-dom/client';
import App from './App';
import UserInfoProvider from './context/UserInfoContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserInfoProvider>
    <App />
  </UserInfoProvider>,
);
