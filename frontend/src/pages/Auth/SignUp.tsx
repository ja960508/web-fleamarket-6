import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomInput from '../../components/CustomInput';
import PageHeader from '../../components/PageHeader/PageHeader';
import { NICKNAME, PASSWORD } from '../../constants/validation';
import { UserInfoDispatch } from '../../context/UserInfoContext';
import useTextInputs from '../../hooks/useTextInputs';
import { credentialRemote, remote } from '../../lib/api';
import { useHistoryState, useNavigate } from '../../lib/Router/hooks';
import colors from '../../styles/colors';

interface regionType {
  id: number;
  name: string;
}

function SignUp() {
  const [region, setRegion] = useState<regionType[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<regionType>({
    id: 0,
    name: '',
  });
  const githubUser = useHistoryState();
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

  useEffect(() => {
    (async function () {
      const { data } = await remote('region');

      setRegion(data);
    })();
  }, []);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (githubUser) {
      const userInfo = { ...githubUser, regionId: selectedRegion.id };

      const { data } = await credentialRemote.post('auth/signup', {
        user: userInfo,
      });

      dispatch({
        type: 'USERINFO/SET_USER',
        payload: {
          userId: data.id,
          name: data.nickname,
          region: '잠실',
          regionId: 1,
        },
      });
      navigate('/');

      return;
    }

    const userInfo = {
      nickname: inputs.nickname,
      password: inputs.password,
      regionId: selectedRegion.id,
    };

    const { data } = await credentialRemote.post('auth/signup', userInfo);

    dispatch({
      type: 'USERINFO/SET_USER',
      payload: {
        userId: data.id,
        name: data.nickname,
        region: '잠실',
        regionId: 1,
      },
    });
    navigate('/');
  };

  const handleSelectRegion = (item: regionType) => {
    setSelectedRegion(item);
  };

  return (
    <>
      <PageHeader pageName="회원가입" />
      <StyledSignupForm onSubmit={handleRegister}>
        {!githubUser && (
          <>
            <CustomInput
              name="nickname"
              type="text"
              value={inputs.nickname}
              onChange={handleChange('nickname')}
              placeholder="영문, 숫자 조합 10자 이하"
              validation={NICKNAME.REGEX}
              error={NICKNAME.ERROR_MESSAGE}
              autoComplete="off"
            />
            <CustomInput
              name="password"
              type="password"
              value={inputs.password}
              onChange={handleChange('password')}
              placeholder="영문/특문/숫자 조합 16자 이하"
              validation={PASSWORD.REGEX}
              error={PASSWORD.ERROR_MESSAGE}
            />
          </>
        )}
        <CustomInput
          type="text"
          placeholder="시∙구 제외, 동만 입력."
          value={selectedRegion.name}
          readOnly={true}
        />
        <ul>
          {region.map((item) => (
            <li key={item.id} onClick={() => handleSelectRegion(item)}>
              {item.name}
            </li>
          ))}
        </ul>
        <button type="submit">회원가입</button>
      </StyledSignupForm>
    </>
  );
}

export default SignUp;

const StyledSignupForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  input {
    margin-bottom: 1rem;
  }

  button[type='submit'] {
    padding: 0.625rem 0;
    background-color: ${colors.primary};
    color: ${colors.white};
    border-radius: 8px;
  }
`;
