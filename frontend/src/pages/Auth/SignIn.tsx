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
    </div>
  );
}

export default SignIn;
