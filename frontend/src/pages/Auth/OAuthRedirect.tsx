import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from '../../lib/Router';

function OAuthRedirect() {
  const searchParams = useSearchParams();
  const navigate = useNavigate();

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
    })();
  }, [navigate, searchParams]);

  return <div>OAuthRedirect</div>;
}

export default OAuthRedirect;
