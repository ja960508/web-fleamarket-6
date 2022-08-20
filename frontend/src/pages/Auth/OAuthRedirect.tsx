import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { UserInfoDispatch } from '../../context/UserInfoContext';
import { useNavigate, useSearchParams } from '../../lib/Router';

function OAuthRedirect() {
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useContext(UserInfoDispatch);

  useEffect(() => {
    const code = searchParams('code');

    if (!code) {
      navigate('/auth/sign-in');
    }

    (async function () {
      const { data } = await axios.post(
        'http://localhost:4000/auth/oauth/github',
        {
          code,
        },
      );

      if (data.isExist) {
        dispatch({
          type: 'USERINFO/SET_USER',
          payload: {
            userId: data.user.githubUserId,
            name: data.user.nickname,
            region: '잠실',
            regionId: 1,
          },
        });
        navigate('/');

        return;
      }

      navigate('/auth/sign-up', data.user);
    })();
  }, [navigate, searchParams, dispatch]);

  return <div>OAuthRedirect</div>;
}

export default OAuthRedirect;
