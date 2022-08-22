import { useContext, useState } from 'react';
import styled from 'styled-components';
import CustomInput from '../components/CustomInput';
import withCheckLogin from '../components/HOC/withCheckLogin';
import PageHeader from '../components/PageHeader/PageHeader';
import { UserInfoContext, UserInfoDispatch } from '../context/UserInfoContext';
import useQuery from '../hooks/useQuery';
import { remote } from '../lib/api';
import { useNavigate } from '../lib/Router';
import colors from '../styles/colors';
import { RegionType } from '../types/region';

function RegionInfo() {
  const userInfo = useContext(UserInfoContext);
  const userInfoDispatch = useContext(UserInfoDispatch);
  const { data } = useQuery(['region'], async () => {
    const result = await remote('/region');
    return result.data;
  });
  const [selectedRegion, setSelectedRegion] = useState({ id: 0, name: '' });
  const [isFocus, setIsFocus] = useState(false);
  const navigate = useNavigate();

  const handleSelectRegion = (item: RegionType) => {
    setSelectedRegion(item);
    setIsFocus(false);
  };

  const handleChangeRegion = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    await remote.patch('/region', {
      userId: userInfo.userId,
      regionId: selectedRegion.id,
    });

    userInfoDispatch({
      type: 'USERINFO/CHANGE_REGION',
      payload: { regionId: selectedRegion.id, region: selectedRegion.name },
    });

    navigate('/');
  };

  return (
    <>
      <PageHeader pageName="현재 지역 변경하기" />
      <StyledForm onSubmit={handleChangeRegion}>
        <div className="current-info">
          <div className="guide-ment">현재 설정된 동네</div>
          <div className="current-region">{userInfo.region}</div>
        </div>
        <label className="region-label" htmlFor="region">
          변경할 동네를 입력하세요
        </label>
        <CustomInput
          placeholder="시∙구 제외, 동만 입력"
          type="text"
          id="region"
          value={selectedRegion.name}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          readOnly
        />
        {isFocus && (
          <ul>
            {data.map((item: RegionType) => (
              <li
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelectRegion(item)}
                className="region-item"
                key={item.id}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
        <button disabled={!selectedRegion.id} type="submit">
          변경하기
        </button>
      </StyledForm>
    </>
  );
}

export default withCheckLogin(RegionInfo);

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;

  .current-info {
    margin-bottom: 3.5rem;

    .guide-ment {
      margin-bottom: 1.25rem;
    }

    .current-region {
      padding: 0.5rem;
      background-color: #ff5c00;
      border-radius: 8px;
      text-align: center;
      color: ${colors.white};
    }
  }

  .region-label {
    margin-bottom: 1.25rem;
  }

  button[type='submit'] {
    margin-top: 1.25rem;
    padding: 0.625rem;
    background: #c8b6ff;
    opacity: 0.5;
    border-radius: 8px;
    color: ${colors.white};
  }

  .region-item {
    padding: 0.5rem;
    background-color: ${colors.gray200};
    border-bottom: 1px solid ${colors.white};
  }
`;
