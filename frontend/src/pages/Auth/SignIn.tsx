import { useContext, useState } from 'react';
import styled from 'styled-components';
import CustomInput from '../../components/CustomInput';
import PageHeader from '../../components/PageHeader/PageHeader';
import { UserInfoDispatch } from '../../context/UserInfoContext';
import { remote } from '../../lib/api';
import { Link, useNavigate } from '../../lib/Router';
import colors from '../../styles/colors';

function SignIn() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useContext(UserInfoDispatch);
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = await remote.post(
      'auth/signin',
      { nickname, password },
      { withCredentials: true },
    );

    if (!data) {
      alert('로그인에 실패했습니다.');

      return;
    }

    dispatch({
      type: 'USERINFO/SET_USER',
      payload: {
        userId: data.id,
        name: data.nickname,
        region: data.regionName,
        regionId: data.regionId,
      },
    });

    navigate('/');
  };

  return (
    <>
      <PageHeader pageName="로그인" />
      <StyledSignInForm onSubmit={handleLogin}>
        <CustomInput
          type="text"
          name="nickname"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
    </>
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
