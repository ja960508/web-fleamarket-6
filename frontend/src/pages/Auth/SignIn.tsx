import { useContext } from 'react';
import styled from 'styled-components';
import CustomInput from '../../components/CustomInput';
import PageHeader from '../../components/PageHeader/PageHeader';
import { NICKNAME, PASSWORD } from '../../constants/validation';
import { UserInfoDispatch } from '../../context/UserInfoContext';
import useTextInputs from '../../hooks/useTextInputs';
import { credentialRemote } from '../../lib/api';
import { Link, useNavigate } from '../../lib/Router';
import colors from '../../styles/colors';

function SignIn() {
  const dispatch = useContext(UserInfoDispatch);
  const navigate = useNavigate();
  const { inputs, handleChange } = useTextInputs<{
    nickname: string;
    password: string;
  }>({
    initialValue: {
      nickname: '',
      password: '',
    },
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = await credentialRemote.post('auth/signin', {
      nickname: inputs.nickname,
      password: inputs.password,
    });

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
          value={inputs.nickname}
          onChange={handleChange('nickname')}
          autoComplete="off"
          validation={NICKNAME.REGEX}
          error={NICKNAME.ERROR_MESSAGE}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          value={inputs.password}
          onChange={handleChange('password')}
          validation={PASSWORD.REGEX}
          error={PASSWORD.ERROR_MESSAGE}
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
