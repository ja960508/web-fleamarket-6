import {
  ComponentProps,
  FunctionComponent,
  useContext,
  useEffect,
} from 'react';
import { UserInfoContext } from '../../context/UserInfoContext';
import { useNavigate } from '../../lib/Router';

function withCheckLogin<T>(Component: FunctionComponent<T>) {
  return function WithCheckLogin(props: ComponentProps<FunctionComponent<T>>) {
    const userInfo = useContext(UserInfoContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!userInfo.userId) {
        navigate('/auth/sign-in', { replace: true });
      }
    }, [userInfo]);

    return <Component {...props} />;
  };
}

export default withCheckLogin;
