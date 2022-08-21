import { Link } from '../../lib/Router';

function SignIn() {
  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${
          import.meta.env.VITE_CLIENT_ID
        }`}
      >
        깃허브로 로그인
      </a>
      <Link to="/auth/sign-up">회원가입</Link>
    </div>
  );
}

export default SignIn;
