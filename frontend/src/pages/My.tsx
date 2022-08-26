import { useContext } from 'react';
import styled from 'styled-components';
import PageHeader from '../components/PageHeader/PageHeader';
import TABS from '../constants/tabs';
import { UserInfoDispatch } from '../context/UserInfoContext';
import useMyPage from '../hooks/useMyPage';
import { credentialRemote } from '../lib/api';
import { useNavigate } from '../lib/Router';
import colors from '../styles/colors';
import { textSmall } from '../styles/fonts';

function My() {
  const dispatch = useContext(UserInfoDispatch);
  const navigate = useNavigate();
  const { tab, selectTab, getTabContents } = useMyPage();

  const handleLogout = async () => {
    await credentialRemote.get('auth/logout');
    dispatch({ type: 'USERINFO/DELETE_USER' });
    navigate('/');
  };

  return (
    <>
      <PageHeader
        pageName="마이페이지"
        extraButton={<button onClick={handleLogout}>로그아웃</button>}
      />
      <StyledMyPageTabs>
        {TABS.map((item) => (
          <li
            key={item}
            className={tab === item ? 'selected' : ''}
            onClick={() => selectTab(item)}
          >
            {item}
          </li>
        ))}
      </StyledMyPageTabs>
      <ul>{getTabContents()}</ul>
    </>
  );
}

export default My;

const StyledMyPageTabs = styled.ul`
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
  background-color: ${colors.offWhite};

  li {
    padding: 0 0.5rem 1rem 0.5rem;
  }

  .selected {
    color: ${colors.primary};
    border-bottom: 2px solid ${colors.primary};
  }
`;

export const StyledGuideMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  ${textSmall};
  color: ${colors.gray200};
`;
