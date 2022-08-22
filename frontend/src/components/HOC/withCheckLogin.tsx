import React, { useContext } from 'react';
import { UserInfoContext } from '../../context/UserInfoContext';
import { useNavigate } from '../../lib/Router';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withCheckLogin(Component: React.ComponentType<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function WithCheckAdmin(props: any) {
    const userInfo = useContext(UserInfoContext);
    const navigate = useNavigate();

    if (!userInfo.userId) {
      navigate('/');
    }

    return <Component {...props} />;
  };
}

export default withCheckLogin;
