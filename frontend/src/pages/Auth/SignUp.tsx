import axios from 'axios';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import CustomInput from '../../components/CustomInput';
import { UserInfoDispatch } from '../../context/UserInfoContext';
import { useHistoryState, useNavigate } from '../../lib/Router/hooks';
import colors from '../../styles/colors';

interface regionType {
  id: number;
  name: string;
}

function SignUp() {
  const [region, setRegion] = useState<regionType[]>([
    {
      id: 1,
      name: '잠실',
    },
  ]);
  const [selectedRegion, setSelectedRegion] = useState<regionType>({
    id: 0,
    name: '',
  });
  const githubUser = useHistoryState();
  const dispatch = useContext(UserInfoDispatch);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (githubUser) {
      const userInfo = { ...githubUser, regionId: selectedRegion.id };

      const { data } = await axios.post('http://localhost:4000/auth/signup', {
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

    const { nickname, password } = event.target as HTMLFormElement;
    const userInfo = {
      nickname: nickname.value,
      password: password.value,
      regionId: selectedRegion.id,
    };

    const { data } = await axios.post('http://localhost:4000/auth/signup', {
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
  };

  const handleSelectRegion = (item: regionType) => {
    setSelectedRegion(item);
  };

  return (
    <StyledSignupForm onSubmit={handleRegister}>
      {!githubUser && (
        <>
          <CustomInput
            name="nickname"
            type="text"
            placeholder="영문, 숫자 조합 10자 이하"
          />
          <CustomInput
            name="password"
            type="password"
            placeholder="영문/특문/숫자 조합 16자 이하"
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
