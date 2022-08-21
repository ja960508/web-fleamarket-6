import styled from 'styled-components';
import CustomInput from '../../components/CustomInput';
import { Link } from '../../lib/Router';
import colors from '../../styles/colors';

function SignIn() {
  return (
    <StyledSignInForm>
      <CustomInput
        type="text"
        name="nickname"
        placeholder="닉네임을 입력하세요"
      />
      <CustomInput
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
      />
      <button type="submit">로그인</button>
      <StyledGithubOAuthLink
        href={`https://github.com/login/oauth/authorize?client_id=${
          import.meta.env.VITE_CLIENT_ID
        }`}
      >
        깃허브로 로그인
      </StyledGithubOAuthLink>
      <Link to="/auth/sign-up">회원가입</Link>
    </StyledSignInForm>
  );
}

export default SignIn;

const StyledSignInForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  padding-top: 3rem;
  text-align: center;

  input {
    margin-bottom: 1rem;
  }

  button[type='submit'] {
    padding: 0.625rem 0;
    background-color: ${colors.primary};
    color: ${colors.white};
    border-radius: 8px;
    margin-bottom: 1rem;
  }
`;

const StyledGithubOAuthLink = styled.a`
  display: block;
  padding: 0.625rem 0;
  background-color: #666666;
  color: ${colors.white};
  border-radius: 8px;
  margin-bottom: 1rem;
`;
