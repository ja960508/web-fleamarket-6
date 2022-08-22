import React, { useContext } from 'react';
import { UserInfoContext } from '../../context/UserInfoContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withCheckLogin(Component: React.ComponentType<any>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function WithCheckLogin(props: any) {
    const userInfo = useContext(UserInfoContext);

    if (!userInfo.userId) {
      window.history.back();
    }

    return <Component {...props} />;
  };
}

export default withCheckLogin;
